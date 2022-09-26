from rest_framework import serializers
from backend.models import *

class ExaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examination
        fields = ['exam_id', 'doctor', 'patient', 'diagnosis', 'prescription', 'sessiontime']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'name']

class PatientSessionIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingExamination
        fields = ['exam_id']

class PatientRecordsSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.user.name')
    class Meta:
        model = HealthRecord
        fields = ['name', 'dateofbirth', 'height', 'weight', 'bloodtype', 'allergies']

class PatientPastSessionSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source='doctor.user.name')
    diagnosis = serializers.CharField(source='diagnosis.description')
    class Meta:
        model = Examination
        fields = ['session_id', 'doctor', 'diagnosis', 'prescription', 'sessiontime']
