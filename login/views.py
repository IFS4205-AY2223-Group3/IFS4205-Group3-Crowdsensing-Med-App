from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("everyone login here")

def patient(request):
    return HttpResponse("view count, generate session, view records, logout")

def doctor(request):
    return HttpResponse("view count, examine, logout")

def medical_helper(request):
    return HttpResponse("view count, logout")

def researcher(request):
    return HttpResponse("view anonymized records, logout")

