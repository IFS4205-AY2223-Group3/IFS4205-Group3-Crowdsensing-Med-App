from django.urls import path
from . import views

app_name = 'doctor'
urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('newsession', views.new_session, name='newsession'),
    path('examine/', views.examine, name='examine'),
    path('confirmation/', views.confirmation, name='confirmation'),
]
