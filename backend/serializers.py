from rest_framework import serializers
from backend.models import *


class ExaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examination
        fields = ["exam_id", "doctor", "patient", "diagnosis", "prescription"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["user_id", "name"]


class PatientSessionIdSerializer(serializers.ModelSerializer):
    examId = serializers.CharField(source="exam_id")

    class Meta:
        model = PendingExamination
        fields = ["examId"]


class PatientRecordsSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.user.name")

    class Meta:
        model = HealthRecord
        fields = ["name", "dateofbirth", "height", "weight", "bloodtype", "allergies"]


class PatientPastSessionSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source="doctor.user.name")
    diagnosis = serializers.CharField(source="diagnosis.description")

    class Meta:
        model = Examination
        fields = ["exam_id", "doctor", "diagnosis", "prescription", "examtime"]

class DoctorPastSessionSerializer(serializers.ModelSerializer):
    patient = serializers.CharField(source="patient.user.name")
    diagnosis = serializers.CharField(source="diagnosis.description")

    class Meta:
        model = Examination
        fields = ["exam_id", "patient", "diagnosis", "prescription", "examtime"]


class CrowdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crowd
        fields = ["count"]
