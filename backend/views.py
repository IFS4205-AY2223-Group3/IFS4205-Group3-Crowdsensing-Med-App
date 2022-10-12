from smtplib import SMTPAuthenticationError
from django.db.utils import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import update_last_login
from django.core.mail import send_mail

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken

from backend.models import *
from backend.serializers import *
from backend.permissions import *
from rest_framework.serializers import ValidationError

from django_otp import devices_for_user
from django_otp.plugins.otp_totp.models import TOTPDevice


LOGIN_ERROR_MESSAGE = "Login credentials are incorrect. Please check and try again."
LOGOUT_ERROR_MESSAGE = "Invalid credentials"
SUCCESS_MESSAGE = "success"
ASSIGN_ERROR_MESSAGE = "This examination ID is invalid or the patient has to approve the examination."
GENERIC_ERROR_MESSAGE = "There was an error, please try again."
ALREADY_ASSIGNED_ERROR_MESSAGE = "A doctor has been assigned to this examination"
SELF_ASSIGN_ERROR_MESSAGE = "You cannot assign yourself as a doctor."
INVALID_EXAM_ERROR_MESSAGE = "Please check examination details again."

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
        if not device:
            device = user.totpdevice_set.create(confirmed=False)
            return Response({'message':device.config_url}, status=status.HTTP_201_CREATED)
        elif device.confirmed == False:
            return Response({'message':device.config_url}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'you already have a device registered'}, status=status.HTTP_200_OK)

class TOTPDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user = request.user
        device = get_user_totp_device(self, user, True)
        if device == None:
            return Response({'message': 'You do not have a registered device.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            old_request = RemoveOTPRequest.objects.get(user=user)
            old_request.delete()
        except RemoveOTPRequest.DoesNotExist:
            pass

        new_request = RemoveOTPRequest.create(user)
        new_request.save()

        subject = 'Delete MediBook Authenticator'
        message = 'Hi ' + user.name + ',' + '\n\n'
        message += 'You requested to delete your authenticator for your MediBook account: ' + user.username + '\n\n'
        message += 'Your OTP is ' + new_request.key + '\n\n'
        message += 'If you did not make this request, please change your password immediately!'
        try: 
            send_mail(
                subject=subject,
                message=message,
                from_email=None,
                recipient_list=[user.email],
                fail_silently=False,
            )
        except SMTPAuthenticationError:
            return Response({'message': 'An error occurred on our end, please try again later.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        return Response({'message': 'Success, please check your email for a OTP'}, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        try:
            otp = request.data['otp']
            user = request.user

            remove_request = RemoveOTPRequest.objects.get(user=user)
            if otp == remove_request.key:
                device = get_user_totp_device(self, user, True)
                if device != None:
                    device.delete()
                    remove_request.delete()
                    return Response({'message':'Device successfully removed.'}, status=status.HTTP_200_OK)
                else:
                   return Response({'message': 'You do not have a registered device.'}, status=status.HTTP_404_NOT_FOUND) 
            else:
                remove_request.attempts += 1
                if remove_request.attempts >= 5:
                    remove_request.delete()
                    return Response({'message': 'You have exceeded the number of attempts to remove the authenticator, please make a new request'}, status=status.HTTP_406_NOT_ACCEPTABLE)
                else:
                    remove_request.save()
                    return Response({'message': 'Invalid OTP, please try again.'}, status=status.HTTP_403_FORBIDDEN)
        except KeyError:
            return Response({'message': GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST)
        except RemoveOTPRequest.DoesNotExist:
            return Response({'message': GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST)

class TOTPVerifyView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        try:
            otp = request.data['otp']
            user = request.user
            device = get_user_totp_device(self, user)
            if not device == None and device.verify_token(otp):
                if not device.confirmed:
                    device.confirmed = True
                    device.save()
                request.auth.verify()
                return Response({'message': SUCCESS_MESSAGE}, status=status.HTTP_200_OK)
        except KeyError:
            return Response({'message': 'Invalid'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Invalid'}, status=status.HTTP_400_BAD_REQUEST)

class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        try:
            role = get_role(request.data["role"])
            serializer = self.serializer_class(
                data=request.data, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data["user"]
            role.objects.get(user=user)
            try:
                token = UserToken.objects.get(user=user)
                token.delete()
            except UserToken.DoesNotExist:
                pass
            token = UserToken.objects.create(user=user)
            device = get_user_totp_device(self, user)
            data = {}
            data["token"] = token.key
            data["name"] = user.name
            data["role"] = request.data["role"]
            data["hasDevice"] = (device is not None and device.confirmed == True)
            update_last_login(None, user)

            return Response(data, status=status.HTTP_200_OK)
        except KeyError:
            return Response(
                {"message": LOGIN_ERROR_MESSAGE}, status=status.HTTP_403_FORBIDDEN
            )
        except role.DoesNotExist:
            return Response(
                {"message": LOGIN_ERROR_MESSAGE}, status=status.HTTP_403_FORBIDDEN
            )
        except ValidationError:
            return Response(
                {"message": LOGIN_ERROR_MESSAGE}, status=status.HTTP_403_FORBIDDEN
            )


class Logout(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        request.auth.delete()
        return Response({"message": SUCCESS_MESSAGE}, status=status.HTTP_200_OK)


#######################################################################################################################
# DOCTOR API


class AssignPendingExam(APIView):
    parser_classes = [JSONParser]
    permission_classes = (IsAuthenticated, IsVerified, IsDoctor)

    # assign doctor to a session (done by doctors)
    @csrf_exempt
    def post(self, request):
        try:
            exam_id = request.data["examId"]
            assigned_session = PendingExamination.objects.get(exam_id=exam_id)
            doctor = Doctor.objects.get(user=request.auth.user)

            if (
                assigned_session.doctor is not None
                and assigned_session.doctor != doctor
            ):
                return Response(
                    {"message": ASSIGN_ERROR_MESSAGE},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if assigned_session.approved == False:
                return Response(
                    {"message": ASSIGN_ERROR_MESSAGE},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if assigned_session.patient.user == request.auth.user:
                return Response(
                    {"message": SELF_ASSIGN_ERROR_MESSAGE},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            assigned_session.doctor = doctor
            assigned_session.save()
            response = {
                "patientId": assigned_session.patient.user_id,
                "patientName": assigned_session.patient.user.name,
                "examId": assigned_session.exam_id,
            }
            return Response(response, status=status.HTTP_200_OK)

        except KeyError:
            return Response(
                {"message": GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )
        except PendingExamination.DoesNotExist:
            return Response(
                {"message": ASSIGN_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )
        except IntegrityError:
            return Response(
                {"message": ALREADY_ASSIGNED_ERROR_MESSAGE},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DoctorGetRecords(APIView):
    parser_classes = [JSONParser]
    permission_classes = (IsAuthenticated, IsDoctor)

    # get examinations (done by doctors)
    @csrf_exempt
    def get(self, request):
        try:
            # check if doctor is assigned to patient
            doctor = Doctor.objects.get(user=request.auth.user)
            pendingexam = PendingExamination.objects.get(doctor=doctor)
            patient = pendingexam.patient
            records = HealthRecord.objects.get(user=patient)
            exams = Examination.objects.all().filter(patient=patient)
            serialized_record = PatientRecordsSerializer(records)
            data = {}
            data["healthRecords"] = serialized_record.data
            try:
                serialized_exams = PatientPastSessionSerializer(exams, many=True)
                data["examRecords"] = serialized_exams.data
            except PendingExamination.DoesNotExist:
                data["examRecords"] = {}
            return Response(data, status=status.HTTP_200_OK)
        except Patient.DoesNotExist:
            return Response(
                {"message": GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )
        except PendingExamination.DoesNotExist:
            return Response(
                {"message": GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )
        except HealthRecord.DoesNotExist:
            return Response(
                {"message": GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )


class AddExamination(APIView):
    parser_classes = [JSONParser]
    permission_classes = (IsAuthenticated, IsDoctor)

    # store new examination result (done by doctors)
    @csrf_exempt
    def post(self, request):
        try:
            data = {}
            doctor = Doctor.objects.get(user=request.auth.user)
            pendingexam = PendingExamination.objects.get(doctor=doctor)
            data["exam_id"] = pendingexam.exam_id
            data["doctor"] = pendingexam.doctor
            data["patient"] = pendingexam.patient
            data["diagnosis"] = request.data["code"]
            data["prescription"] = request.data["prescription"]
            exam = ExaminationSerializer(data=data)
            if exam.is_valid():
                exam.save()
                PendingExamination.objects.get(
                    exam_id=exam.validated_data["exam_id"]
                ).delete()
                return Response({"message": "success"}, status=status.HTTP_200_OK)
            return Response(
                {"message": INVALID_EXAM_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )
        except PendingExamination.DoesNotExist:
            return Response(
                {"message": GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )
        except KeyError:
            return Response(
                {"message": GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )

class DoctorViewOldSessions(APIView):
    parser_classes = [JSONParser]
    permission_classes = (IsAuthenticated, IsDoctor)

    @csrf_exempt
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
        return Response(data, status=status.HTTP_200_OK)


#######################################################################################################################
# PATIENT API


class CreateSession(APIView):
    parser_classes = [JSONParser]
    permission_classes = (IsAuthenticated,)

    @csrf_exempt
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

    @csrf_exempt
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

    @csrf_exempt
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


#######################################################################################################################
# IOT API


class CrowdView(APIView):
    parser_classes = [JSONParser]

    @csrf_exempt
    def post(self, request):
        serialized_data = CrowdSerializer(data=request.data)
        if serialized_data.is_valid():
            serialized_data.save()
            return Response({"message": SUCCESS_MESSAGE}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )

    @csrf_exempt
    def get(self, request):
        try:
            crowd = Crowd.objects.latest("time_recorded")
            serializer = CrowdDataSerializer(crowd)
        except Crowd.DoesNotExist:
            return Response(
                {"message": GENERIC_ERROR_MESSAGE}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response({"count":serializer.data}, status=status.HTTP_200_OK)
