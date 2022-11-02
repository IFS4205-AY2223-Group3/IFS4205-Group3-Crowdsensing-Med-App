from smtplib import SMTPAuthenticationError
from django.db.utils import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import update_last_login
from django.core.mail import send_mail
from django.db.models import Q

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken

from backend.models import *
from backend.serializers import *
from backend.permissions import *
from backend.exceptions import *
from rest_framework.serializers import ValidationError

from django_otp import devices_for_user
from django_otp.plugins.otp_totp.models import TOTPDevice

import hashlib
import logging

logger = logging.getLogger(__name__)


LOGIN_ERROR_MESSAGE = "Login credentials are incorrect. Please check and try again."
LOGOUT_ERROR_MESSAGE = "Invalid credentials"
SUCCESS_MESSAGE = "success"
ASSIGN_ERROR_MESSAGE = (
    "This examination ID is invalid or the patient has to approve the examination."
)
GENERIC_ERROR_MESSAGE = "There was an error, please try again."
ALREADY_ASSIGNED_ERROR_MESSAGE = "This examination has been assigned to another doctor"
SELF_ASSIGN_ERROR_MESSAGE = "You cannot assign yourself as a doctor."
INVALID_EXAM_ERROR_MESSAGE = "Please check examination details again."


def log_info(data):
    logger.info(" | ".join(data))


#######################################################################################################################
# OTP API


def get_user_totp_device(self, user, confirmed=None):
    devices = devices_for_user(user, confirmed=confirmed)
    for device in devices:
        if isinstance(device, TOTPDevice):
            return device


class TOTPCreateView(APIView):
    permission_classes = [IsNotExpired]

    def get(self, request, *args, **kwargs):
        user = request.user
        device = get_user_totp_device(self, user)
        if not device or device.confirmed == False:
            log_info(
                ["OTP", user.username, "/createotp", "Success", "New device created"]
            )
            device, _ = user.totpdevice_set.get_or_create(confirmed=False)
            return Response(
                {"message": device.config_url}, status=status.HTTP_201_CREATED
            )
        else:
            log_info(
                [
                    "OTP",
                    user.username,
                    "/createotp",
                    "Failure",
                    "Device already registered",
                ]
            )
            return Response(
                {"message": "you already have a device registered"},
                status=status.HTTP_200_OK,
            )


class TOTPDeleteView(APIView):
    permission_classes = [IsNotExpired]

    def get(self, request, *args, **kwargs):
        user = request.user
        device = get_user_totp_device(self, user, True)
        if device == None:
            log_info(
                [
                    "OTP",
                    user.username,
                    "/deleteotp",
                    "Failure",
                    "No confirmed device registered",
                ]
            )
            raise NoDeviceException()
        try:
            old_request = RemoveOTPRequest.objects.get(user=user)
            old_request.delete()
        except RemoveOTPRequest.DoesNotExist:
            pass

        new_request = RemoveOTPRequest.create(user)
        new_request.save()

        subject = "Delete MediBook Authenticator"
        message = "Hi " + user.name + "," + "\n\n"
        message += (
            "You requested to delete your authenticator for your MediBook account: "
            + user.username
            + "\n\n"
        )
        message += "Your OTP is " + new_request.key + "\n\n"
        message += (
            "If you did not make this request, please change your password immediately!"
        )
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=None,
                recipient_list=[user.email],
                fail_silently=False,
            )
        except SMTPAuthenticationError:
            log_info(["OTP", user.username, "/deleteotp", "Failure", "SMTP error"])
            raise SMTPException()
        log_info(
            ["OTP", user.username, "/deleteotp", "Success", "Email containing OTP sent"]
        )
        return Response(
            {"message": "Success, please check your email for a OTP"},
            status=status.HTTP_200_OK,
        )

    def post(self, request, *args, **kwargs):
        try:
            otp = request.data["otp"]
            user = request.user

            remove_request = RemoveOTPRequest.objects.get(user=user)
            if otp == remove_request.key:
                device = get_user_totp_device(self, user, True)
                if device != None:
                    device.delete()
                    remove_request.delete()
                    log_info(
                        [
                            "OTP",
                            user.username,
                            "/deleteotp",
                            "Success",
                            "Device removed",
                        ]
                    )
                    return Response(
                        {"message": "Device successfully removed."},
                        status=status.HTTP_200_OK,
                    )
                else:
                    log_info(
                        [
                            "OTP",
                            user.username,
                            "/deleteotp",
                            "Failure",
                            "No confirmed device",
                        ]
                    )
                    return Response(
                        {"message": "You do not have a registered device."},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            else:
                remove_request.attempts += 1
                if remove_request.attempts >= 5:
                    remove_request.delete()
                    log_info(
                        [
                            "OTP",
                            user.username,
                            "/deleteotp",
                            "Failure",
                            "Exceeded 5 attempts to verify OTP",
                        ]
                    )
                    return Response(
                        {
                            "message": "You have exceeded the number of attempts to remove the authenticator, please make a new request"
                        },
                        status=status.HTTP_406_NOT_ACCEPTABLE,
                    )
                else:
                    remove_request.save()
                    log_info(
                        [
                            "OTP",
                            user.username,
                            "/deleteotp",
                            "Failure",
                            "Incorrect OTP, attempts left: "
                            + str(5 - remove_request.attempts),
                        ]
                    )
                    return Response(
                        {"message": "Invalid OTP, please try again."},
                        status=status.HTTP_403_FORBIDDEN,
                    )
        except KeyError:
            raise InvalidRequestException()
        except RemoveOTPRequest.DoesNotExist:
            raise InvalidRequestException()


class TOTPVerifyView(APIView):
    permission_classes = [IsNotExpired]

    def post(self, request, *args, **kwargs):
        try:
            otp = request.data["otp"]
            user = request.user
            device = get_user_totp_device(self, user)
            if not device == None and device.verify_token(otp):
                if not device.confirmed:
                    log_info(
                        [
                            "OTP",
                            user.username,
                            "/verifyotp",
                            "Success",
                            "New device and token verified",
                        ]
                    )
                    device.confirmed = True
                    device.save()
                else:
                    log_info(
                        [
                            "OTP",
                            user.username,
                            "/verifyotp",
                            "Success",
                            "Token verified",
                        ]
                    )
                request.auth.verify()
                return Response({"message": SUCCESS_MESSAGE}, status=status.HTTP_200_OK)
        except KeyError:
            raise InvalidRequestException()
        log_info(["OTP", user.username, "/verifyotp", "Failure", "Invalid OTP"])
        return Response({"message": "Invalid"}, status=status.HTTP_400_BAD_REQUEST)


#######################################################################################################################
# LOGIN/LOGOUT API


class Login(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            username = str(request.data["username"]).lower()
            role = get_role(request.data["role"])
        except KeyError:  # missing username / role field
            raise InvalidRequestException()

        if role is not None:
            serializer = self.serializer_class(
                data=request.data, context={"request": request}
            )
            try:
                serializer.is_valid(raise_exception=True)
            except ValidationError:  # invalid username, password
                log_info(
                    [
                        "User",
                        username,
                        "/login",
                        "Failure",
                        "Invalid username / password",
                    ]
                )
                raise InvalidLoginException()

            user = serializer.validated_data["user"]

            try:
                role.objects.get(user=user)
                UserToken.objects.get(user=user).delete()
            except role.DoesNotExist:
                log_info(
                    [
                        "User",
                        user.username,
                        "/login",
                        "Failure",
                        "No such role for user",
                    ]
                )
                raise InvalidLoginException()
            except UserToken.DoesNotExist:
                pass

            token = UserToken.objects.create(user=user)
            token.role = request.data["role"]
            token.save()
            device = get_user_totp_device(self, user)
            data = {
                "token": token.key,
                "name": user.name,
                "role": role.__name__,
                "hasDevice": (device is not None and device.confirmed == True),
            }

            update_last_login(None, user)
            log_info(["User", user.username, "/login", "Success"])
            return Response(data, status=status.HTTP_200_OK)
        raise InvalidLoginException()


class Logout(APIView):
    def get(self, request, *args, **kwargs):
        log_info(["User", request.user.username, "/logout", "Success"])
        request.auth.delete()
        return Response({"message": SUCCESS_MESSAGE}, status=status.HTTP_200_OK)


def get_role(user_role):
    role = user_role.lower()
    if role == "patient":
        return Patient
    if role == "doctor":
        return Doctor
    if role == "researcher":
        return Researcher
    if role == "medicalstaff":
        return MedicalStaff
    return None


class CheckAuth(APIView):
    def get(self, request, *args, **kwargs):
        data = {}
        if request.auth.verified:
            data["userRole"] = request.auth.role
            return Response(data, status=status.HTTP_200_OK)
        else:
            data["message"] = "Token is unverified."
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


#######################################################################################################################
# DOCTOR API


class AssignPendingExam(APIView):
    parser_classes = [JSONParser]
    permission_classes = [IsVerified, IsNotExpired, IsDoctor]
    # assign doctor to a session (done by doctors)
    @csrf_exempt
    def post(self, request):
        try:
            doctor = Doctor.objects.get(user=request.auth.user)
            exam_id = request.data["examId"]
            assigned_session = PendingExamination.objects.get(exam_id=exam_id)

            if (
                assigned_session.doctor is not None
                and assigned_session.doctor != doctor
            ):
                log_info(
                    [
                        "Doctor",
                        doctor.user.username,
                        "/assigndoctor",
                        "Failure",
                        "Doctor already assigned",
                        "exam_id = " + exam_id,
                    ]
                )
                raise AlreadyAssignedException()

            if assigned_session.approved == False:
                log_info(
                    [
                        "Doctor",
                        doctor.user.username,
                        "/assigndoctor",
                        "Failure",
                        "Session not approved",
                        "exam_id = " + exam_id,
                    ]
                )
                raise CannotAssignException()

            if assigned_session.patient.user == request.auth.user:
                log_info(
                    [
                        "Doctor",
                        doctor.user.username,
                        "/assigndoctor",
                        "Failure",
                        "Cannot self-assign as patient/doctor",
                        "exam_id = " + exam_id,
                    ]
                )
                raise CannotAssignException()

            assigned_session.doctor = doctor
            assigned_session.save()
            response = {
                "patientId": assigned_session.patient.user_id,
                "patientName": assigned_session.patient.user.name,
                "examId": assigned_session.exam_id,
            }
            log_info(
                [
                    "Doctor",
                    doctor.user.username,
                    "/assigndoctor",
                    "Success",
                    "exam_id = " + exam_id,
                ]
            )
            return Response(response, status=status.HTTP_200_OK)

        except KeyError:
            log_info(
                [
                    "Doctor",
                    doctor.user.username,
                    "/assigndoctor",
                    "Failure",
                    "Missing data",
                ]
            )
            raise InvalidRequestException()
        except PendingExamination.DoesNotExist:
            log_info(
                [
                    "Doctor",
                    doctor.user.username,
                    "/assigndoctor",
                    "Failure",
                    "No such session",
                ]
            )
            raise CannotAssignException()
        except IntegrityError:
            raise AlreadyAssignedException()


class DoctorGetRecords(APIView):
    parser_classes = [JSONParser]
    permission_classes = [IsVerified, IsNotExpired, IsDoctor]

    def get(self, request):
        try:
            doctor = Doctor.objects.get(user=request.auth.user)
            pendingexam = PendingExamination.objects.get(doctor=doctor)
            patient = pendingexam.patient
            data = {}
            try:
                records = HealthRecord.objects.get(user=patient)
                serialized_record = PatientRecordsSerializer(records)
                data["healthRecords"] = serialized_record.data
            except HealthRecord.DoesNotExist:
                data["healthRecords"] = {}

            exams = Examination.objects.all().filter(patient=patient)
            try:
                serialized_exams = PatientPastSessionSerializer(exams, many=True)
                data["examRecords"] = serialized_exams.data
            except PendingExamination.DoesNotExist:
                data["examRecords"] = {}

            log_info(
                [
                    "Doctor",
                    doctor.user.username,
                    "/doctorviewrecords",
                    "Success",
                    "Retrieved records of patient " + patient.user.user_id,
                ]
            )
            return Response(data, status=status.HTTP_200_OK)
        except PendingExamination.DoesNotExist:
            log_info(
                [
                    "Doctor",
                    doctor.user.username,
                    "/doctorviewrecords",
                    "Failure",
                    "Not assigned to a session",
                ]
            )
            raise NoSessionException()


class AddExamination(APIView):
    parser_classes = [JSONParser]
    permission_classes = [IsVerified, IsNotExpired, IsDoctor]

    def post(self, request):
        try:
            doctor = Doctor.objects.get(user=request.auth.user)
            pendingexam = PendingExamination.objects.get(doctor=doctor)
            data = {
                "exam_id": pendingexam.exam_id,
                "doctor": pendingexam.doctor,
                "patient": pendingexam.patient,
                "diagnosis": request.data["code"],
                "prescription": request.data["prescription"],
            }
            exam = ExaminationSerializer(data=data)
            if exam.is_valid():
                exam.save()
                PendingExamination.objects.get(
                    exam_id=exam.validated_data["exam_id"]
                ).delete()
                log_info(
                    [
                        "Doctor",
                        doctor.user.username,
                        "/submitexamination",
                        "Success",
                        "Submitted examination " + exam.validated_data["exam_id"],
                    ]
                )
                return Response({"message": "success"}, status=status.HTTP_200_OK)
            log_info(
                [
                    "Doctor",
                    doctor.user.username,
                    "/submitexamination",
                    "Failure",
                    "Invalid data submitted",
                ]
            )
            raise InvalidExamException()
        except PendingExamination.DoesNotExist:
            log_info(
                [
                    "Doctor",
                    doctor.user.username,
                    "/submitexamination",
                    "Failure",
                    "Not assigned to a session",
                ]
            )
            raise NoSessionException()
        except KeyError:
            raise InvalidRequestException()


class DoctorViewOldSessions(APIView):
    parser_classes = [JSONParser]
    permission_classes = [IsVerified, IsNotExpired, IsDoctor]

    def get(self, request):
        data = {}
        doctor_object = Doctor.objects.get(user=request.auth.user)
        past_sessions = Examination.objects.filter(doctor=doctor_object)
        try:
            data["examRecords"] = DoctorPastSessionSerializer(
                past_sessions, many=True
            ).data
        except Examination.DoesNotExist:
            data["examRecords"] = {}
        log_info(["Doctor", request.user.username, "/doctorviewoldsessions", "Success"])
        return Response(data, status=status.HTTP_200_OK)


#######################################################################################################################
# PATIENT API


class GenerateSession(APIView):
    parser_classes = [JSONParser]
    permission_classes = [IsVerified, IsNotExpired, IsPatient]

    def get(self, request):
        user_obj = request.auth.user
        patient_obj = get_patient_object(user_obj)
        if not patient_obj:
            log_info(
                [
                    "Patient",
                    user_obj.user.username,
                    "/generatesession",
                    "Failure",
                    "Unauthorised",
                ]
            )
            return Response(
                {"message": "Action forbidden."}, status=status.HTTP_403_FORBIDDEN
            )
        # Checks if patient has an existing pending examination
        try:
            existing_session = PendingExamination.objects.get(pk=patient_obj)
        except ObjectDoesNotExist:
            session = PendingExamination.objects.create_exam(patient_obj)
            # Returns error if backend produces an existing exam_id
            if not session:
                log_info(
                    [
                        "Patient",
                        patient_obj.user.username,
                        "/generatesession",
                        "Failure",
                        "Existing exam_id",
                    ]
                )
                return Response(
                    {"message": "Server encountered an error, please try again."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            else:
                existing_session = session
        data = {}
        data = PatientSessionIdSerializer(existing_session).data
        log_info(
            [
                "Patient",
                request.user.username,
                "/generatesession",
                "Success",
                "exam_id = " + existing_session.exam_id,
            ]
        )
        return Response(data, status=status.HTTP_200_OK)


class PatientViewRecords(APIView):
    parser_classes = [JSONParser]
    permission_classes = [IsVerified, IsNotExpired, IsPatient]

    def get(self, request):
        user_obj = request.auth.user
        patient_obj = get_patient_object(user_obj)
        data = {}
        # Checks if user is a patient
        if not patient_obj:
            log_info(
                [
                    "Patient",
                    user_obj.user.username,
                    "/patientviewrecords",
                    "Failure",
                    "Unauthorised",
                ]
            )
            return Response(
                {"message": "Action forbidden."}, status=status.HTTP_403_FORBIDDEN
            )
        try:
            record_obj = HealthRecord.objects.get(pk=patient_obj)
            data["healthRecords"] = PatientRecordsSerializer(record_obj).data
        except HealthRecord.DoesNotExist:
            data["healthRecords"] = {}
        try:
            past_sessions = Examination.objects.filter(patient=patient_obj)
            data["examRecords"] = PatientPastSessionSerializer(
                past_sessions, many=True
            ).data
        except Examination.DoesNotExist:
            data["examRecords"] = {}
            log_info(
                ["Patient", request.user.username, "/patientviewrecords", "Success"]
            )
        return Response(data, status=status.HTTP_200_OK)


class AllowSession(APIView):
    parser_classes = [JSONParser]
    permission_classes = [IsVerified, IsNotExpired, IsPatient]

    def post(self, request):
        user_obj = request.auth.user
        patient_obj = get_patient_object(user_obj)
        if not patient_obj:
            log_info(
                [
                    "Patient",
                    user_obj.user.username,
                    "/allowsession",
                    "Failure",
                    "Unauthorised",
                ]
            )
            return Response(
                {"message": "Action forbidden."}, status=status.HTTP_403_FORBIDDEN
            )
        exam_id = request.data["examId"]
        data = {}
        session = PendingExamination.objects.filter(
            exam_id=exam_id, patient=patient_obj
        )
        if not session:
            log_info(
                [
                    "Patient",
                    user_obj.user.username,
                    "/allowsession",
                    "Failure",
                    "No pending session",
                ]
            )
            return Response(
                {"message": "There was an error. No session exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            session.update(approved=True)
            data["message"] = "success"
            log_info(["Patient", request.user.username, "/allowsession", "Success"])
        return Response(data, status=status.HTTP_200_OK)


def get_patient_object(user):
    user_obj = user
    try:
        patient_obj = Patient.objects.get(pk=user_obj)
    except ObjectDoesNotExist:
        return Patient.objects.none()
    return patient_obj


#######################################################################################################################
# IOT API


class CrowdView(APIView):
    parser_classes = [JSONParser]
    permission_classes = [AllowAny]

    def post(self, request):
        iot = User.objects.get(username="iot")
        iot_token = UserToken.objects.get(user=iot)
        try:
            secret = request.data["secret"]
            r = request.data["key"]

            m = hashlib.sha256((iot_token.key + r).encode()).hexdigest()
            if m != secret:
                raise ValueError

            data = {"count": int(request.data["count"])}

            serialized_data = CrowdSerializer(data=data)
            if serialized_data.is_valid():
                serialized_data.save()
                log_info(["IOT", "/iot", "Success"])
                return Response({"message": SUCCESS_MESSAGE}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": GENERIC_ERROR_MESSAGE},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except (KeyError, ValueError) as e:
            raise InvalidRequestException()

    def get(self, request):
        try:
            crowd = Crowd.objects.latest("time_recorded")
            serializer = CrowdDataSerializer(crowd)
        except Crowd.DoesNotExist:
            return Response(
                {"message": GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response({"count": serializer.data}, status=status.HTTP_200_OK)


#######################################################################################################################
# RESEARCHER API


class ResearcherView(APIView):
    permission_classes = [IsVerified, IsNotExpired, IsResearcher]

    def post(self, request):
        try:
            q = verify_search_keys(request.data)
        except KeyError:
            log_info(
                [
                    "Researcher",
                    request.user.username,
                    "/researcherviewrecords",
                    "Failure",
                    "Invalid request",
                ]
            )
            raise InvalidRequestException()

        records = AnonymizedRecord.objects.all()
        for i in q:
            records = records.filter(i)
        serializer = AnonymizedRecordSerializer(records, many=True)
        log_info(
            [
                "Researcher",
                request.user.username,
                "/researcherviewrecords",
                "Success",
                "Retrieved " + str(records.count()) + " anonymized records",
            ]
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


def verify_search_keys(s):
    race_values = {"Chinese", "Malay", "Indian", "Others"}
    q = []
    try:
        if s["zipcode"] != "*":
            s["zipcode"] = int(s["zipcode"])
            if not (100000 <= s["zipcode"] <= 900000):
                raise KeyError
            q.append(Q(zipcode_range__contains=s["zipcode"]))

        if s["age"] != "*":
            s["age"] = int(s["age"])
            if not (6 <= s["age"] <= 100):
                raise KeyError
            q.append(Q(age_range__contains=s["age"]))

        if s["height"] != "*":
            s["height"] = int(s["height"])
            if not (130 <= s["height"] <= 209):
                raise KeyError
            q.append(Q(height_range__contains=s["height"]))

        if s["weight"] != "*":
            s["weight"] = int(s["weight"])
            if not (40 <= s["weight"] <= 119):
                raise KeyError
            q.append(Q(weight_range__contains=s["weight"]))

        if s["allergies"] != "*":
            if str(s["allergies"]).upper() == "Y":
                s["allergies"] = "Have allergies"
            elif str(s["allergies"]).upper() == "N":
                s["allergies"] = "No allergy"
            else:
                raise KeyError
            q.append(Q(allergies=s["allergies"]))

        if s["sex"] != "*":
            s["sex"] = str(s["sex"]).upper()
            if s["sex"] != "M" and s["sex"] != "F":
                raise KeyError
            else:
                q.append(Q(sex=s["sex"]))

        if s["race"] == "*":
            pass
        elif str(s["race"]).capitalize() in race_values:
            q.append(Q(race=str(s["race"]).capitalize()))
        else:
            raise KeyError

        if s["diagnosis"] == "*":
            pass
        elif Diagnosis.objects.filter(code=s["diagnosis"]).exists():
            q.append(Q(diagnosis=s["diagnosis"]))
        else:
            raise KeyError

        return q
    except ValueError as e:
        raise KeyError
