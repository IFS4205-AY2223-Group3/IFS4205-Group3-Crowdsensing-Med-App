from rest_framework import permissions
from backend.models import Doctor


class IsDoctor(permissions.BasePermission):
    message = "This resource can only be accessed by doctors."

    def has_permission(self, request, view):
        try:
            Doctor.objects.get(user=request.auth.user)
            return True
        except Doctor.DoesNotExist:
            return False


class IsVerified(permissions.BasePermission):
    message = "OTP not verified!"

    def has_permission(self, request, view):
        if request.auth.user is not None:
            return request.auth.verified
        return False
