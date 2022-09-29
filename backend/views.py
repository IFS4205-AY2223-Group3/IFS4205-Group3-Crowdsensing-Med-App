from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from backend.models import User, Researcher, MedicalStaff, Doctor, Patient, PendingExamination, HealthRecord, Examination
from backend.serializers import *
from rest_framework.serializers import ValidationError

class AssignPendingExam(APIView):
	parser_classes = [JSONParser]
	permission_classes = (IsAuthenticated, )
	
	#assign doctor to a session (done by doctors)
	@csrf_exempt
	def post(self, request):
		try:
			exam_id = request.data['exam_id']
			assigned_session = PendingExamination.objects.get(exam_id=exam_id)
			doctor = Doctor.objects.get(user=request.auth.user)

			if assigned_session.doctor is not None and assigned_session.doctor != doctor:
				return Response({'message': 'patient has already been assigned'})
				
			if assigned_session.approved == False:
				return Response({'message': 'patient has yet to give consent!'})

			assigned_session.doctor = doctor
			assigned_session.save()
			response = {
				'patientId': assigned_session.patient.user_id,
				'patientName': assigned_session.patient.user.name,
				'examId': assigned_session.exam_id
			}
			return Response(response)

		except KeyError:
			return Response({'message':'invalid data'})
		except PendingExamination.DoesNotExist:
			return Response({'message':'invalid data'})
		except Doctor.DoesNotExist:
			return Response({'message':'invalid data'})

class GetExamination(APIView):
	parser_classes = [JSONParser]

	#get examinations (done by doctors)
	@csrf_exempt
	def post(self, request):
		try:
			patient = Patient.objects.get(user=request.data['user_id'])
			exams = Examination.objects.all().filter(patient=patient)
			serialized_exams = ExaminationSerializer(exams, many=True)
			return Response(serialized_exams.data)
		except Patient.DoesNotExist:
			return Response({'message':'invalid data'})

class AddExamination(APIView):
	parser_classes = [JSONParser]

	#store new examination result (done by doctors)
	@csrf_exempt
	def post(self, request):
		exam = ExaminationSerializer(data=request.data)
		if exam.is_valid():
			exam.save()
			PendingExamination.objects.get(exam_id=exam.validated_data['exam_id']).delete()
			return Response({'message':'success'})
		return Response({'message':'invalid data'})

# Might need modification to generate new token, even when there is an existing token for the user
class Login(ObtainAuthToken):
	def post(self, request, *args, **kwargs):
		try:
			role = get_role(request.data['role'])
			serializer = self.serializer_class(data=request.data, context={'request':request})
			serializer.is_valid(raise_exception=True)
			user = serializer.validated_data['user']
			role.objects.get(user=user)
			token, created = Token.objects.get_or_create(user=user)
			return Response({
				'token': token.key,
				'userId': user.user_id,
				'name': user.name,
				'role': request.data['role']
			})
		except KeyError:
			return Response({'message: Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
		except role.DoesNotExist:
			return Response({'message: Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
		except ValidationError:
			return Response({'message: Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class Logout(APIView):
	def post(self, request, *args, **kwargs):
		try:
			request.auth.token.delete()
			return Response({'message: success'}, status=status.HTTP_200_OK)
		except ValidationError:
			return Response({'message: Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
		except AttributeError:
			return Response({'message: Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class CreateSession(APIView):
	parser_classes = [JSONParser]
	permission_classes = (IsAuthenticated, )

	@csrf_exempt
	def get(self, request):
		user_obj = request.auth.user
		patient_obj = get_patient_object(user_obj)
		if not patient_obj:
			return Response({'message': 'Action forbidden.'}, status=status.HTTP_403_FORBIDDEN)
		#Checks if patient has an existing pending session
		try:
			existing_session = PendingExamination.objects.get(pk = patient_obj)
		except ObjectDoesNotExist:
			session = PendingExamination.objects.create_exam(patient_obj)
			#Returns error if backend produces an existing session_id
			if not session:
				return Response({'message': 'Server encountered an error, please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
			else:
				existing_session = session
		data = {}
		data = PatientSessionIdSerializer(existing_session).data
		return Response(data, status=status.HTTP_200_OK)


class PatientViewRecords(APIView):
	parser_classes = [JSONParser]
	permission_classes = (IsAuthenticated, )

	@csrf_exempt
	def get(self, request):
		user_obj = request.auth.user	
		patient_obj = get_patient_object(user_obj)
		data = {}
		#Checks if user is a patient
		if not patient_obj:
			return Response({'message': 'Action forbidden.'}, status=status.HTTP_403_FORBIDDEN)
		try:
			record_obj = HealthRecord.objects.get(pk = patient_obj)
			data['healthRecords'] = PatientRecordsSerializer(record_obj).data
		except HealthRecord.DoesNotExist:
			data['healthRecords'] = {}
		try:
			past_sessions = Examination.objects.filter(patient = patient_obj)
			data['examRecords'] = PatientPastSessionSerializer(past_sessions, many=True).data
		except Examination.DoesNotExist:
			data['examRecords'] = {}
		return Response(data, status=status.HTTP_200_OK)

class AllowSession(APIView):
	parser_classes = [JSONParser]
	permission_classes = (IsAuthenticated, )

	@csrf_exempt
	def post(self, request):
		user_obj = request.auth.user
		patient_obj = get_patient_object(user_obj)
		if not patient_obj:
			return Response({'message': 'Action forbidden.'}, status=status.HTTP_403_FORBIDDEN)
		exam_id = request.data['examId']
		data = {}
		session = PendingExamination.objects.filter(exam_id = exam_id,patient = patient_obj)
		if not session:
			return Response({'message': 'There was an error. No session exists.'}, status=status.HTTP_400_BAD_REQUEST)
		else:
			session.update(approved=True)
			data['message'] = "success"
		return Response(data, status=status.HTTP_200_OK)

def get_patient_object(user):
	user_obj = user
	try:
		patient_obj = Patient.objects.get(pk = user_obj)
	except ObjectDoesNotExist:
		return Patient.objects.none()
	return patient_obj
		
def get_role(user_role):
	role = user_role.lower()
	if role == 'patient':
		return Patient
	if role == 'doctor':
		return Doctor
	if role == 'researcher':
		return Researcher
	if role == 'medicalstaff':
		return MedicalStaff