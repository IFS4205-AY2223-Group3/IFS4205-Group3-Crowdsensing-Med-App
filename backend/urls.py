from django.urls import include, path
from . import views

app_name = 'backend'
urlpatterns = [
    path('login_user/', views.login_user, name='login'),
]