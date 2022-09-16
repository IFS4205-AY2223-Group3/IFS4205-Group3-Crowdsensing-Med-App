from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse

# Create your views here.
    
def dashboard(request):
    if (request.user.is_authenticated):
        return render(request, 'doctor/dashboard.html')
    else:
        return redirect(reverse('login:index'))

def examine(request):
    if (request.user.is_authenticated):
        return render(request, 'doctor/examine.html')
    else:
        return redirect(reverse('login:index'))

def confirmation(request):
    if (request.user.is_authenticated):
        context = {'sessionid': request.session['sessionid']}
        return render(request, 'doctor/confirmation.html', context)
    else:
        return redirect(reverse('login:index'))
