from rest_framework import permissions
from datetime import datetime
from backend.models import Doctor, Researcher, Patient, UserToken

PATIENT_ROLE = "patient"
DOCTOR_ROLE = "doctor"
RESEARCHER_ROLE = "researcher"

class IsNotExpired(permissions.BasePermission):
    message = "Your token has expired, please log in again."

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            diff = datetime.now(request.auth.created.tzinfo) - request.auth.created
            if diff.total_seconds() / 60 < 1440:
                return True
            return False
        return False



class IsDoctor(permissions.BasePermission):
    message = "This resource can only be accessed by doctors."

    def has_permission(self, request, view):
        try:
            user_token = UserToken.objects.get(key=request.auth)
            if user_token.role == DOCTOR_ROLE:
                return True
            return False
        except UserToken.DoesNotExist:
            return False


class IsResearcher(permissions.BasePermission):
    message = "This resource can only be accessed by researchers."

    def has_permission(self, request, view):
        try:
            user_token = UserToken.objects.get(key=request.auth)
            if user_token.role == RESEARCHER_ROLE:
                return True
            return False
        except UserToken.DoesNotExist:
            return False


class IsPatient(permissions.BasePermission):
    message = "This resource can only be accessed by patients."

    def has_permission(self, request, view):
        try:
            user_token = UserToken.objects.get(key=request.auth)
            if user_token.role == PATIENT_ROLE:
                return True
            return False
        except UserToken.DoesNotExist:
            return False


class IsVerified(permissions.BasePermission):
    message = "OTP not verified!"

    def has_permission(self, request, view):
        if request.auth.user is not None:
            return request.auth.verified
        return False
