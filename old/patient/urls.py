from django.urls import path
from . import views

app_name = 'patient'
urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('health_records/', views.health_records, name='health_records'),
    path('sessions/', views.sessions, name='sessions'),
    path('generate/', views.generate, name='generate')
]
