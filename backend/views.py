from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import Patient, Doctor, Researcher, MedicalStaff, PendingSessions, HealthRecords, Examinations, User
from backend.serializers import UserSerializer 

@api_view(["POST", "GET"])
def login_user(request):
	if request.method == "POST":
		username = request.POST.get('user')
		password = request.POST.get('password')
		role = request.POST.get('role')
		user = authenticate(request, username=username, password=password)
		if user is not None:
			try:
				get_role(role).objects.get(pk=user.user_id)
				login(request, user)
				data = {}
				data = UserSerializer(user).data
				data["role"] = role
				return Response(data, status=status.HTTP_200_OK)
			except ObjectDoesNotExist:
				return Response({'errorMessage': 'Login credentials are incorrect. Please check and try again.'}
				, status=status.HTTP_403_FORBIDDEN)
		else:	
			return Response({'errorMessage': 'Login credentials are incorrect. Please check and try again.'}
			, status=status.HTTP_403_FORBIDDEN)
	else:
		return Response({'errorMessage': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)

def create_session(request):
	if request.method == "POST":
		user = request.user
		session = PendingSessions.objects.create_session(username)
		return HttpResponse(session.sessionid)

def get_records(request):
	if request.method == "GET":
		personal_records = request.user
		health_records = HealthRecords.objects.get(userid=request.user.userid)
		context= {
			'health_records':health_records,
			'personal_records': personal_records
		}
		return render(request, 'patient/health_records.html', context)

def get_sessions(request):
	if request.method == "GET":
		sessions = Examinations.objects.filter(patientid=request.user.userid)
		users = User.objects.all()
		context= {
			'sessions':sessions,
			'users': users
		}
		return render(request, 'patient/sessions.html', context)	

def assign_doctor(request):
	if request.method == "POST":
		sessionid = request.POST['sessionid']
		user = request.user
		doctor = Doctor.objects.get(userid=user.userid)
		if doctor is not None:
			target_session = PendingSessions.objects.get(sessionid=sessionid)
			target_session.doctorid = doctor
			target_session.save()
			request.session['sessionid'] = target_session.sessionid
			return redirect(reverse('doctor:confirmation'))
		else:
			return HttpResponse("invalid")
	else:
		return HttpResponse("invalid")
		
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
