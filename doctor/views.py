from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse
from backend.models import Patient, Doctor, HealthRecords, PendingSessions, Examinations

# Create your views here.
    
def dashboard(request):
    if (request.user.is_authenticated):
        return render(request, 'doctor/dashboard.html')
    else:
        return redirect(reverse('login:index'))
    
def new_session(request):
    if (request.user.is_authenticated):
        return render(request, 'doctor/newsession.html')
    else:
        return redirect(reverse('login:index'))

def examine(request):
    if (request.user.is_authenticated):
        try:
            doc = Doctor.objects.get(user=request.user)
            new_session = PendingSessions.objects.get(doctor=doc)
            if new_session.approved == False:
                request.session['error_msg'] = 'Patient has not approved the request!'
                return redirect(reverse('doctor:confirmation'))
            context = { 
                'session': new_session, 
                'record': HealthRecords.objects.get(user=new_session.patient),
                'past_visits': Examinations.objects.all().filter(patient=new_session.patient)
                }
            return render(request, 'doctor/examine.html', context)
        except Doctor.DoesNotExist:
            return redirect(reverse('login:index'))
    else:
        return redirect(reverse('login:index'))

def confirmation(request):
    if (request.user.is_authenticated):
        context = {
            'sessionid': request.session['session_id'],
            'error_message': request.session['error_msg']
            }
        return render(request, 'doctor/confirmation.html', context)
    else:
        return redirect(reverse('login:index'))
