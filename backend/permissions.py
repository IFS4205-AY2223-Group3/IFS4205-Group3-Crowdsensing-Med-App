from rest_framework import permissions
from backend.models import Doctor


class isDoctor(permissions.BasePermission):
    message = "Only Doctors can access this resource."

    def has_permission(self, request, view):
        try:
            Doctor.objects.get(user=request.auth.user)
            return True
        except Doctor.DoesNotExist:
            return False

class IsVerified(permissions.BasePermission):
    message = "OTP not verified!"

    def has_permission(self, request, view):
        if request.auth.user is not None and request.auth.verified is True:
            return True
        return False
