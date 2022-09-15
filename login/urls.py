from django.urls import path
from . import views

app_name = 'login'
urlpatterns = [
    path('', views.index, name='index'),
    path('patient/', views.patient, name='patientdashboard'),
    path('doctor/dashboard/', views.doctor, name='doctordashboard'),
    path('medical-helper/', views.medical_helper, name='medicalhelperdashboard'),
    path('researcher/', views.researcher, name='researcherdashboard'),
    path('doctor/examine/', views.doctorexamine, name='doctorexamine'),
    path('doctor/hold/', views.doctorhold, name='doctorhold')
]
