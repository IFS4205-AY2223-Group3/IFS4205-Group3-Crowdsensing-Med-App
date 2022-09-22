from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse

# Create your views here.
    
def dashboard(request):
    if (request.user.is_authenticated):
        return render(request, 'patient/dashboard.html')
    else:
        return redirect(reverse('login:index'))

def health_records(request):
    if (request.user.is_authenticated):
        return render(request, 'patient/health_records.html')
    else:
        return redirect(reverse('login:index'))

def sessions(request):
    if (request.user.is_authenticated):
        return render(request, 'patient/sessions.html')
    else:
        return redirect(reverse('login:index'))

def generate(request):
    if (request.user.is_authenticated):
        return render(request, 'patient/generate.html')
    else:
        return redirect(reverse('login:index'))