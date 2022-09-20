from django.shortcuts import render, redirect
from django.urls import reverse

from backend.views import get_name

def dashboard(request):
    if request.user.is_authenticated:
        context = {'staffname': get_name(request)}
        return render(request, 'medicalstaff/dashboard.html', context)
    else:
        return redirect(reverse('login:index'))
