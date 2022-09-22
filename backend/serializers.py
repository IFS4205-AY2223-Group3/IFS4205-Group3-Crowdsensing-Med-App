from rest_framework import serializers
from backend.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'name']

class PatientSessionIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingSessions
        fields = ['session_id']

class PatientRecordsSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.user.name')
    class Meta:
        model = HealthRecords
        fields = ['name', 'dateofbirth', 'height', 'weight', 'bloodtype', 'allergies']

class PatientPastSessionSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source='doctor.user.name')
    diagnosis = serializers.CharField(source='diagnosis.description')
    class Meta:
        model = Examinations
        fields = ['session_id', 'doctor', 'diagnosis', 'prescription', 'sessiontime']