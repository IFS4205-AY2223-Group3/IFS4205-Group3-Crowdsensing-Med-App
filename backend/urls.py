from django.urls import include, path
from . import views

app_name = 'backend'
urlpatterns = [
    path('login', views.Login.as_view(), name='login'),
    path('logout', views.Logout.as_view()),
    path('generate_session', views.create_session, name='generatesession'),
    path('view_records', views.view_records, name='viewrecords'),
    path('allow_session', views.allow_session, name='allowsession'),
    path('assign_doctor', views.AssignPendingExam.as_view()),
    path('submit_examination', views.AddExamination.as_view()),
    path('doctorviewrecords', views.DoctorGetRecords.as_view())
    #path('assign_doctor', views.assign_doctor, name='assigndoctor'),
    #path('submit_examination', views.finish_examine, name='submit_examination'),
    #path('get_sessions', views.get_sessions, name='getsessions')
    #path('logout_user', views.logout_user, name='logout'),
]