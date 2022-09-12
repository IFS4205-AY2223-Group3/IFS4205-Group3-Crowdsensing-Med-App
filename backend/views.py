from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from backend.models import Patient, Doctor, Researcher, MedicalStaff

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
