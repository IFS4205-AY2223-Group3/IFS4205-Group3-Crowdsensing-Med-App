from rest_framework import serializers
from backend.models import *

class PendingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingSessions
        fields = ['patient']

class ExaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examinations
        fields = ['session_id', 'doctor', 'patient', 'diagnosis', 'prescription', 'sessiontime']
