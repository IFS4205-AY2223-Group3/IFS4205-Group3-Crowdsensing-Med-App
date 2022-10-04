from django.urls import re_path, path
from . import views

app_name = "backend"
urlpatterns = [
    path("login", views.Login.as_view(), name="login"),
    path("logout", views.Logout.as_view()),
    path("generatesession", views.CreateSession.as_view()),
    path("patientviewrecords", views.PatientViewRecords.as_view()),
    path("allowsession", views.AllowSession.as_view()),
    path("assigndoctor", views.AssignPendingExam.as_view()),
    path("submitexamination", views.AddExamination.as_view()),
    path("doctorviewrecords", views.DoctorGetRecords.as_view()),
    path("iot", views.CrowdView.as_view()),
    re_path(r'^totp/create/$', views.TOTPCreateView.as_view(), name='totp-create'),
    re_path(r'^totp/login/(?P<token>[0-9]{6})/$', views.TOTPVerifyView.as_view(), name='totp-login'),
    # path('assign_doctor', views.assign_doctor, name='assigndoctor'),
    # path('submit_examination', views.finish_examine, name='submit_examination'),
    # path('get_sessions', views.get_sessions, name='getsessions')
    # path('logout_user', views.logout_user, name='logout'),
]
