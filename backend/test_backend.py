from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from backend.models import *
from backend.serializers import *

# Create your tests here.
class PatientLoginTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="patient", password="12patient12", email="test@example.com"
        )
        self.user.save()
        Patient.objects.create(user_id=self.user.user_id)

    def tearDown(self):
        Patient.objects.filter(user_id=self.user.user_id).delete()
        self.user.delete()

    def test_login_pass(self):
        response = self.client.post(
            "/login",
            {"username": "patient", "password": "12patient12", "role": "patient"},
        )
        expected_response = status.HTTP_200_OK
        self.assertEqual(response.status_code, expected_response)

    def test_wrong_username(self):
        response = self.client.post(
            "/login",
            {"username": "wrong", "password": "12patient12", "role": "patient"},
        )
        expected_response = status.HTTP_403_FORBIDDEN
        self.assertEqual(response.status_code, expected_response)

    def test_wrong_password(self):
        response = self.client.post(
            "/login", {"username": "patient", "password": "wrong", "role": "patient"}
        )
        expected_response = status.HTTP_403_FORBIDDEN
        self.assertEqual(response.status_code, expected_response)

    def test_wrong_role(self):
        response = self.client.post(
            "/login",
            {"username": "patient", "password": "12patient12", "role": "doctor"},
        )
        expected_response = status.HTTP_403_FORBIDDEN
        self.assertEqual(response.status_code, expected_response)


class DoctorLoginTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="doctor", password="12doctor12", email="test@example.com"
        )
        self.user.save()
        Doctor.objects.create(user_id=self.user.user_id)

    def tearDown(self):
        Doctor.objects.filter(user_id=self.user.user_id).delete()
        self.user.delete()

    def test_login_pass(self):
        response = self.client.post(
            "/login", {"username": "doctor", "password": "12doctor12", "role": "doctor"}
        )
        expected_response = status.HTTP_200_OK
        self.assertEqual(response.status_code, expected_response)

    def test_wrong_username(self):
        response = self.client.post(
            "/login", {"username": "wrong", "password": "12patient12", "role": "doctor"}
        )
        expected_response = status.HTTP_403_FORBIDDEN
        self.assertEqual(response.status_code, expected_response)

    def test_wrong_password(self):
        response = self.client.post(
            "/login", {"username": "doctor", "password": "wrong", "role": "doctor"}
        )
        expected_response = status.HTTP_403_FORBIDDEN
        self.assertEqual(response.status_code, expected_response)

    def test_wrong_role(self):
        response = self.client.post(
            "/login",
            {"username": "doctor", "password": "12doctor12", "role": "patient"},
        )
        expected_response = status.HTTP_403_FORBIDDEN
        self.assertEqual(response.status_code, expected_response)

class PatientTest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()

        doctor = User.objects.create_user(
            username="doctor", password="doctor", email="doctor@example.com"
        )
        patient = User.objects.create_user(
            username="patient", password="patient", email="patient@example.com"
        )
        token = UserToken.objects.create(user=patient)
        doctor.save()
        patient.save()
        token.verify()

        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

        self.user = Patient.objects.create(user=patient)
        self.doctor = Doctor.objects.create(user=doctor)

        HealthRecord.objects.create(
            user=self.user,
            dateofbirth="1998-03-03",
            height=170,
            weight=60,
            bloodtype="A+",
            allergies="None",
        )

        self.diagnosis = Diagnosis.objects.create(
            code="A009",
            description="Chloera unspecified"
        )

        Examination.objects.create(
            exam_id="8S9EDJS83S",
            doctor=self.doctor,
            patient=self.user,
            diagnosis=self.diagnosis,
            prescription="150mg panadol"      
        )

    def test_generate_session(self):
        response = self.client.get("/generatesession")
        expected_response = status.HTTP_200_OK
        self.assertEqual(response.status_code, expected_response)

        exam = PendingExamination.objects.get(patient=self.user)
        serialized_id = PatientSessionIdSerializer(
            PendingExamination.objects.get(patient=self.user)
        )
        expected_data = serialized_id.data
        self.assertEqual(response.data, expected_data)

    def test_patient_view_records(self):
        response = self.client.get("/patientviewrecords")
        expected_response = status.HTTP_200_OK
        self.assertEqual(response.status_code, expected_response)

        records = HealthRecord.objects.get(user_id=self.user)
        expected_data = {}
        expected_data["healthRecords"] = PatientRecordsSerializer(records).data
        past_sessions = Examination.objects.filter(patient=self.user)
        expected_data["examRecords"] = PatientPastSessionSerializer(
            past_sessions, many=True
        ).data
        self.assertEqual(response.data, expected_data)

    def test_allow_session(self):
        generate_session = self.client.get("/generatesession")
        pending_exam = PendingExamination.objects.get(patient=self.user)
        data = {"examId": pending_exam.exam_id}
        response = self.client.post("/allowsession", data)

        expected_response = status.HTTP_200_OK
        self.assertEqual(response.status_code, expected_response)

class DoctorTest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()

        doctor = User.objects.create_user(
            username="doctor", password="doctor", email="doctor@example.com"
        )
        patient = User.objects.create_user(
            username="patient", password="patient", email="patient@example.com"
        )
        token = UserToken.objects.create(user=doctor)
        doctor.save()
        patient.save()
        token.verify()

        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

        self.user = Doctor.objects.create(user=doctor)
        self.patient = Patient.objects.create(user=patient)

        HealthRecord.objects.create(
            user=self.patient,
            dateofbirth="1998-03-03",
            height=170,
            weight=60,
            bloodtype="A+",
            allergies="None",
        )

    def test_assign_patient(self):
        pending_exam = PendingExamination.objects.create_exam(self.patient)
        pending_exam.approved = True
        pending_exam.save()

        data = {"examId": pending_exam.exam_id}

        response = self.client.post("/assigndoctor", data)

        expected_response = status.HTTP_200_OK
        self.assertEqual(response.status_code, expected_response)

        assigned_exam = PendingExamination.objects.get(doctor=self.user)
        self.assertEqual(assigned_exam.doctor, self.user)
        self.assertEqual(assigned_exam.patient, self.patient)

    def test_view_patient_records(self):
        pending_exam = PendingExamination.objects.create_exam(self.patient)
        pending_exam.approved = True
        pending_exam.doctor = self.user
        pending_exam.save()

        response = self.client.get("/doctorviewrecords")

        expected_response = status.HTTP_200_OK
        self.assertEqual(response.status_code, expected_response)

        serialized_record = PatientRecordsSerializer(
            HealthRecord.objects.get(user=self.patient)
        )
        serialized_exams = PatientPastSessionSerializer(
            Examination.objects.all().filter(patient=self.patient), many=True
        )
        expected_data = {}
        expected_data["healthRecords"] = serialized_record.data
        expected_data["examRecords"] = serialized_exams.data

        self.assertEqual(response.data, expected_data)

    def test_submit_examination(self):
        pending_exam = PendingExamination.objects.create_exam(self.patient)
        pending_exam.approved = True
        pending_exam.doctor = self.user
        pending_exam.save()

        diagnosis = Diagnosis.objects.create(code="abc", description="def")
        exam_id = pending_exam.exam_id

        data = {"code": "abc", "prescription": "panadol"}

        response = self.client.post("/submitexamination", data)

        expected_response = status.HTTP_200_OK
        self.assertEqual(response.status_code, expected_response)

        submitted_exam = Examination.objects.get(exam_id=exam_id)
        self.assertEqual(submitted_exam.doctor, self.user)
        self.assertEqual(submitted_exam.patient, self.patient)
        self.assertEqual(submitted_exam.diagnosis.code, "abc")
        self.assertEqual(submitted_exam.prescription, "panadol")
