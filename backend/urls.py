from django.urls import re_path, path
from . import views

app_name = "backend"
urlpatterns = [
    path("login", views.Login.as_view(), name="login"),
    path("logout", views.Logout.as_view()),
    path("generatesession", views.GenerateSession.as_view()),
    path("patientviewrecords", views.PatientViewRecords.as_view()),
    path("allowsession", views.AllowSession.as_view()),
    path("assigndoctor", views.AssignPendingExam.as_view()),
    path("submitexamination", views.AddExamination.as_view()),
    path("doctorviewrecords", views.DoctorGetRecords.as_view()),
    path("iot", views.CrowdView.as_view()),
    path("createotp", views.TOTPCreateView.as_view()),
    path("verifyotp", views.TOTPVerifyView.as_view()),
    path("doctorviewoldsessions", views.DoctorViewOldSessions.as_view()),
    path("deleteotp", views.TOTPDeleteView.as_view()),
    path("researcherviewrecords", views.ResearcherView.as_view()),
    path("checkauth", views.CheckAuth.as_view()),
]
