from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse
from backend.models import Doctor, HealthRecords, PendingSessions, Examinations
from backend.views import check_user_role, check_session_approved, get_examination_context

# Create your views here.
    
def dashboard(request):
    if (request.user.is_authenticated):
        check_user_role(request, Doctor)
        return render(request, 'doctor/dashboard.html')
    else:
        return redirect(reverse('login:index'))
    
def new_session(request):
    if (request.user.is_authenticated):
        check_user_role(request, Doctor)
        return render(request, 'doctor/newsession.html')
    else:
        return redirect(reverse('login:index'))

def examine(request):
    if (request.user.is_authenticated):
        check_user_role(request, Doctor)
        if check_session_approved(request) is True:
            context = get_examination_context(request)
            return render(request, 'doctor/examine.html', context)
        else:
            request.session['error_msg'] = 'Patient has not given consent!'
            return redirect(reverse('doctor:confirmation'))
    else:
        return redirect(reverse('login:index'))

def confirmation(request):
    if (request.user.is_authenticated):
        check_user_role(request, Doctor)

        if 'session_id' not in request.session:
            return redirect(reverse('doctor:newsession'))
        if 'error_msg' not in request.session:
            request.session['error_msg'] = ''

        context = {
            'sessionid': request.session['session_id'],
            'error_message': request.session['error_msg']
            }
        return render(request, 'doctor/confirmation.html', context)
    else:
        return redirect(reverse('login:index'))
