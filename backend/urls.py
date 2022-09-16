from django.urls import include, path
from . import views

app_name = 'backend'
urlpatterns = [
    path('login_user', views.login_user, name='login'),
    path('logout_user', views.logout_user, name='logout'),
    path('create_session', views.create_session, name='createsession'),
    path('assign_doctor', views.assign_doctor, name='assigndoctor'),
    path('get_records', views.get_records, name='getrecords')
]