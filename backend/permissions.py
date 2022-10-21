from rest_framework import permissions
from backend.models import Doctor, Researcher, Patient


class IsDoctor(permissions.BasePermission):
    message = "This resource can only be accessed by doctors."

    def has_permission(self, request, view):
        try:
            Doctor.objects.get(user=request.auth.user)
            return True
        except Doctor.DoesNotExist:
            return False

class IsResearcher(permissions.BasePermission):
    message = "This resource can only be accessed by researchers."

    def has_permission(self, request, view):
        try:
            Researcher.objects.get(user=request.auth.user)
            return True
        except Researcher.DoesNotExist:
            return False

class IsPatient(permissions.BasePermission):
    message = "This resource can only be accessed by patients."

    def has_permission(self, request, view):
        try:
            Patient.objects.get(user=request.auth.user)
            return True
        except Patient.DoesNotExist:
            return False

class IsVerified(permissions.BasePermission):
    message = "OTP not verified!"

    def has_permission(self, request, view):
        if request.auth.user is not None:
            return request.auth.verified
        return False
