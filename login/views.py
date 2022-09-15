from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'login/index.html')

def patient(request):
    return HttpResponse("view count, generate session, view records, logout")

def doctor(request):
    return render(request, 'doctor/dashboard.html')

def doctorexamine(request):
    return render(request, 'doctor/examine.html')

def doctorhold(request):
    context = {'sessionid': request.session['sessionid']}
    return render(request, 'doctor/hold.html', context)

def medical_helper(request):
    return HttpResponse("view count, logout")

def researcher(request):
    return HttpResponse("view anonymized records, logout")


