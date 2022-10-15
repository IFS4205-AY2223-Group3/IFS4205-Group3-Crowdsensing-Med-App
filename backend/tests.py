from django.test import TestCase
from django.contrib.auth import get_user_model, authenticate
from rest_framework import status
from backend.models import *

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
