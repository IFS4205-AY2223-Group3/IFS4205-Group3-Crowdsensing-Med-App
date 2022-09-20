from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from backend.models import *
from backend.serializers import *

class AssignPendingSession(APIView):
	parser_classes = [JSONParser]
	
	#assign doctor to a session (done by doctors)
	@csrf_exempt
	def post(self, request):
		try:
			exam_id = request.data['exam_id']
			doctor_id = request.data['doctor_id']
			#do sanitization here
			assigned_session = PendingSessions.objects.get(session_id=exam_id)
			if assigned_session.approved == False:
				return Response({'message': 'patient has yet to give consent!'})
			assigned_session.doctor = Doctor.objects.get(user_id=doctor_id)
			assigned_session.save()
			response = {
				'patientId': assigned_session.patient.user_id,
				'patientName': assigned_session.patient.user.name,
				'examId': assigned_session.session_id
			}
			return Response(response)

		except KeyError:
			return Response({'message':'invalid data'})
		except PendingSessions.DoesNotExist:
			return Response({'message':'session does not exist!'})
		except Doctor.DoesNotExist:
			return Response({'message':'doctor does not exist!'})

class GetExamination(APIView):
	parser_classes = [JSONParser]

	#get examinations (done by patients + doctors)
	@csrf_exempt
	def post(self, request):
		try:
			patient = Patient.objects.get(user=request.data['user_id'])
			exams = Examinations.objects.all().filter(patient=patient)
			serialized_exams = ExaminationSerializer(exams, many=True)
			return Response(serialized_exams.data)
		except Patient.DoesNotExist:
			return Response("toh")

class AddExamination(APIView):
	parser_classes = [JSONParser]

	#store new examination result (done by doctors)
	@csrf_exempt
	def post(self, request):
		exam = ExaminationSerializer(data=request.data)
		if exam.is_valid():
			exam.save()
			PendingSessions.objects.get(session_id=request.data['session_id']).delete()
			return Response({'message':'success'})
		return Response({'message':'invalid data'})
		


