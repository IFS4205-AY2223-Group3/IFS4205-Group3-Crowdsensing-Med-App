from django.urls import include, path
from . import views

app_name = 'backend'
urlpatterns = [
    path('login', views.Login.as_view(), name='login'),
    path('logout', views.Logout.as_view()),
    path('generatesession', views.CreateSession.as_view()),
    path('patientviewrecords', views.PatientViewRecords.as_view()),
    path('allowsession', views.AllowSession.as_view()),
    path('assign_doctor', views.AssignPendingExam.as_view()),
    path('submit_examination', views.AddExamination.as_view()),
    path('view_records', views.GetExamination.as_view())
    #path('assign_doctor', views.assign_doctor, name='assigndoctor'),
    #path('submit_examination', views.finish_examine, name='submit_examination'),
    #path('get_sessions', views.get_sessions, name='getsessions')
    #path('logout_user', views.logout_user, name='logout'),
]