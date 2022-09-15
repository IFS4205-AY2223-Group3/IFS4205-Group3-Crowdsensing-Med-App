from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'login/index.html')

def patient(request):
    return HttpResponse("view count, generate session, view records, logout")

def medical_helper(request):
    return HttpResponse("view count, logout")

def researcher(request):
    return HttpResponse("view anonymized records, logout")


