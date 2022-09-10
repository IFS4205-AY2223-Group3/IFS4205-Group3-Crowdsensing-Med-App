from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='loginpage'),
    path('patient/', views.patient, name='patientdashboard'),
    path('doctor/', views.doctor, name='doctordashboard'),
    path('medical-helper/', views.medical_helper, name='medicalhelperdashboard'),
    path('researcher/', views.researcher, name='researcherdashboard'),
]
