from smtplib import SMTPAuthenticationError
from django.db.utils import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import update_last_login
from django.core.mail import send_mail
from django.contrib.postgres.fields import IntegerRangeField, RangeOperators

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken

from backend.models import *
from backend.serializers import *
from backend.permissions import *
from backend.exceptions import *
from rest_framework.serializers import ValidationError

from django_otp import devices_for_user
from django_otp.plugins.otp_totp.models import TOTPDevice

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
                    return Response(
                        {"message": "Device successfully removed."},
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {"message": "You do not have a registered device."},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            else:
                remove_request.attempts += 1
                if remove_request.attempts >= 5:
                    remove_request.delete()
                    return Response(
                        {
                            "message": "You have exceeded the number of attempts to remove the authenticator, please make a new request"
                        },
                        status=status.HTTP_406_NOT_ACCEPTABLE,
                    )
                else:
                    remove_request.save()
                    return Response(
                        {"message": "Invalid OTP, please try again."},
                        status=status.HTTP_403_FORBIDDEN,
                    )
        except KeyError:
            raise InvalidRequestException()
        except RemoveOTPRequest.DoesNotExist:
            raise InvalidRequestException()


class TOTPVerifyView(APIView):
    permission_classes = [IsAuthenticated]

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
            device = get_user_totp_device(self, user)
            data = {
                "token": token.key,
                "name": user.name,
                "role": role.__name__,
                "hasDevice": (device is not None and device.confirmed == True),
            }

            update_last_login(None, user)
            log_info(["User", user.username, "/login", "Successful"])
            return Response(data, status=status.HTTP_200_OK)
        raise InvalidLoginException()


class Logout(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        log_info(["User", request.user.username, "/logout", "Successful"])
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


#######################################################################################################################
# DOCTOR API


class AssignPendingExam(APIView):
    parser_classes = [JSONParser]
    permission_classes = (IsAuthenticated, IsDoctor)

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
    permission_classes = (IsAuthenticated, IsDoctor)

    # get examinations (done by doctors)
    def get(self, request):
        try:
            # check if doctor is assigned to patient
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
                    "Successful",
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
    permission_classes = (IsAuthenticated, IsDoctor)

    # store new examination result (done by doctors)
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
    permission_classes = (IsAuthenticated, IsDoctor)

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


class CreateSession(APIView):
    parser_classes = [JSONParser]
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user_obj = request.auth.user
        patient_obj = get_patient_object(user_obj)
        if not patient_obj:
            return Response(
                {"message": "Action forbidden."}, status=status.HTTP_403_FORBIDDEN
            )
        # Checks if patient has an existing pending session
        try:
            existing_session = PendingExamination.objects.get(pk=patient_obj)
        except ObjectDoesNotExist:
            session = PendingExamination.objects.create_exam(patient_obj)
            # Returns error if backend produces an existing session_id
            if not session:
                return Response(
                    {"message": "Server encountered an error, please try again."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            else:
                existing_session = session
        data = {}
        data = PatientSessionIdSerializer(existing_session).data
        return Response(data, status=status.HTTP_200_OK)


class PatientViewRecords(APIView):
    parser_classes = [JSONParser]
    permission_classes = (IsAuthenticated, IsVerified)

    def get(self, request):
        user_obj = request.auth.user
        patient_obj = get_patient_object(user_obj)
        data = {}
        # Checks if user is a patient
        if not patient_obj:
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
        return Response(data, status=status.HTTP_200_OK)


class AllowSession(APIView):
    parser_classes = [JSONParser]
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user_obj = request.auth.user
        patient_obj = get_patient_object(user_obj)
        if not patient_obj:
            return Response(
                {"message": "Action forbidden."}, status=status.HTTP_403_FORBIDDEN
            )
        exam_id = request.data["examId"]
        data = {}
        session = PendingExamination.objects.filter(
            exam_id=exam_id, patient=patient_obj
        )
        if not session:
            return Response(
                {"message": "There was an error. No session exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            session.update(approved=True)
            data["message"] = "success"
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

    def post(self, request):
        serialized_data = CrowdSerializer(data=request.data)
        if serialized_data.is_valid():
            serialized_data.save()
            return Response({"message": SUCCESS_MESSAGE}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )

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
    permission_classes = (IsAuthenticated, IsResearcher)

    def get(self, request):
        serializer = DiagnosisSerializer(Diagnosis.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            search_key = request.data["key"]
            value = request.data["value"]
            verify_search_key(search_key)
        except KeyError:
            raise InvalidRequestException()

        try:
            if search_key == "diagnosis":
                records = AnonymizedRecord.objects.filter(diagnosis=value)
            else:
                value = int(value)
                if search_key == "zipcode":
                    records = AnonymizedRecord.objects.filter(
                        zipcode_range__contains=value
                    )
                elif search_key == "age":
                    records = AnonymizedRecord.objects.filter(age_range__contains=value)
                elif search_key == "height":
                    records = AnonymizedRecord.objects.filter(
                        height_range__contains=value
                    )
                elif search_key == "weight":
                    records = AnonymizedRecord.objects.filter(
                        weight_range__contains=value
                    )
            serializer = AnonymizedRecordSerializer(records, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValueError:
            raise InvalidRequestException()


def verify_search_key(s):
    accepted_values = {"zipcode", "age", "height", "weight", "diagnosis"}
    if str(s).lower() not in accepted_values:
        raise KeyError
