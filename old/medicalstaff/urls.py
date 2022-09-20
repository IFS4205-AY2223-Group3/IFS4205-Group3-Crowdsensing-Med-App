from django.urls import path

from . import views

app_name = 'medicalstaff'
urlpatterns = [
    path('', views.dashboard, name='dashboard'),
]
