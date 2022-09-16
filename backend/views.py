from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from django.http import HttpResponse
from backend.models import Patient, Doctor, Researcher, MedicalStaff, PendingSessions

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
				if user_role.objects.get(userid=user.userid):
					login(request, user)
					if (role == 'doctor'):
						return redirect(reverse('doctor:dashboard'))
					return redirect(reverse('login:success'))
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

def create_session(request):
	if request.method == "POST":
		username = request.POST['username']
		session = PendingSessions.objects.create_session(username)
		return HttpResponse(session.sessionid)

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

def finish_examine(request):
    return HttpResponse('foo')
