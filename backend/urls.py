from django.urls import include, path
from . import views

app_name = 'backend'
urlpatterns = [
    path('login', views.login_user, name='login'),
    #path('logout_user', views.logout_user, name='logout'),
    #path('create_session', views.create_session, name='createsession'),
    #path('assign_doctor', views.assign_doctor, name='assigndoctor'),
    #path('submit_examination', views.finish_examine, name='submit_examination'),
    #path('get_records', views.get_records, name='getrecords'),
    #path('get_sessions', views.get_sessions, name='getsessions')
]