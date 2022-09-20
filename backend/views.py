from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from django.utils.datastructures import MultiValueDictKeyError
from django.http import HttpResponse
from backend.models import *

def login_user(request):
	if request.method == "POST":
		username = request.POST['username']
		password = request.POST['password']
		try:
			role = request.POST['role']
		except MultiValueDictKeyError:
			messages.error(request, ("Please select a role."))
			return redirect(reverse('login:index'))
		user = authenticate(request, username=username, password=password)
		if user is not None:
			try:
				user_role = get_role(role)
				if user_role.objects.get(user_id=user.user_id):
					login(request, user)
					return redirect_user(role, request, user)
			except ObjectDoesNotExist:
				messages.error(request, ("There was an error logging in, try again."))	
				return redirect(reverse('login:index'))
		else:
			messages.error(request, ("There was an error logging in, try again."))	
			return redirect(reverse('login:index'))

	else:
		return render(request, 'authenticate/login.html', {})

def logout_user(request):
	logout(request)
	messages.success(request, ("You Were Logged Out!"))
	return redirect('login:index')

def create_session(request):
	if request.method == "POST":
		username = request.POST['username']
		session = PendingSessions.objects.create_session(username)
		return HttpResponse(session.sessionid)

def get_records(request):
	if request.method == "GET":
		personal_records = request.user
		health_records = HealthRecords.objects.get(user_id=request.user.user_id)
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
		sessionid = request.POST['session_id']
		user = request.user
		try:
			doctor = Doctor.objects.get(user=user)
			target_session = PendingSessions.objects.get(session_id=sessionid)
			target_session.doctor = doctor
			target_session.save()
			request.session['session_id'] = target_session.session_id
			request.session['error_msg'] = ''
			return redirect(reverse('doctor:confirmation'))
		except (Doctor.DoesNotExist, PendingSessions.DoesNotExist) as exception:
			return HttpResponse("invalid")
	else:
		return HttpResponse("invalid")

def finish_examine(request):
	if request.method == "POST":
		# definitely need to add sanitization here
		sessionid = request.session['session_id']
		patient = Patient.objects.get(user_id=request.POST['patientid'])
		doctor = Doctor.objects.get(user_id=request.POST['doctorid'])
		diagnosis = Diagnosis.objects.get(code=request.POST['code'])
		prescription = request.POST['prescription']
		new_exam = Examinations.objects.create_exam(sessionid, doctor, patient, diagnosis, prescription)
		new_exam.save()
		
		PendingSessions.objects.get(session_id=sessionid).delete()
		del request.session['session_id']
		del request.session['error_msg']
		return redirect(reverse('doctor:newsession'))
	return HttpResponse("huh")
		
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

def redirect_user(role_string, request, user):
	if (role_string == 'patient'):
		return redirect(reverse('patient:dashboard'))
	if (role_string == 'doctor'):
		return redirect(reverse('doctor:dashboard'))
	if (role_string == 'researcher'):
		return redirect(reverse('researcher:dashboard'))
	if (role_string == 'medicalstaff'):
		return redirect(reverse('medicalstaff:dashboard'))

def check_user_role(request, role):
	try:
		role.objects.get(user_id=request.user)
	except role.DoesNotExist:
		raise PermissionDenied

def check_session_approved(request):
	try:
		session = PendingSessions.objects.get(doctor=request.user.user_id)
		if session.approved is False:
			return False
		return True
	except PendingSessions.DoesNotExist:
		return False

def get_examination_context(request):
	session = PendingSessions.objects.get(doctor=request.user.user_id)
	context = { 
            'session': session, 
            'record': HealthRecords.objects.get(user=session.patient),
            'past_visits': Examinations.objects.all().filter(patient=session.patient)
            }
	return context

# Common
def get_name(request):
	if request.method == "GET":
		loggedin_user = get_object_or_404(User, userid=request.user.userid)
		return loggedin_user.name