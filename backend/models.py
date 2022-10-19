import secrets
from unittest.util import _MAX_LENGTH

from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils.crypto import get_random_string
from django.utils.translation import gettext_lazy as _


class CustomAccountManager(BaseUserManager):
    def create_user(self, username, email, password, **other_fields):
        if not email:
            raise ValueError(("You must provide an email address"))

        user = self.model(
            username=username, email=self.normalize_email(email), **other_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **other_fields):
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("emailverified", True)

        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be assigned to is_superuser=True.")

        return self.create_user(username, email, password, **other_fields)


class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.CharField(max_length=16, primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)
    name = models.CharField(max_length=50)
    nric = models.CharField(max_length=9)
    contact = models.CharField(max_length=8)
    email = models.EmailField(max_length=50, unique=True)
    emailverified = models.BooleanField(default=False)
    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ("email",)

    def save(self, *args, **kwargs):
        self.username = str(self.username).lower()
        if not self.user_id:
            id = secrets.token_hex(8)
            while User.objects.filter(user_id=id).count() > 0:
                id = secrets.token_hex(8) 
            self.user_id = id
        super().save(*args, **kwargs)

    objects = CustomAccountManager()


class UserToken(models.Model):
    key = models.CharField(("Key"), max_length=40, primary_key=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="User")
    created = models.DateTimeField(_("Created"), auto_now_add=True)
    verified = models.BooleanField()

    @property
    def is_authenticated(self):
        return True

    class Meta:
        verbose_name = _("Token")
        verbose_name_plural = _("Tokens")

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
            self.verified = False
        return super(UserToken, self).save(*args, **kwargs)

    def generate_key(self):
        return secrets.token_hex(20)

    def __str__(self):
        return self.key

    def verify(self):
        self.verified = True
        self.save()

class RemoveOTPRequest(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    key = models.CharField(max_length=30)
    time_created = models.DateField(auto_now_add=True)
    attempts = models.IntegerField()

    @classmethod
    def create(cls, user):
        request = cls(
            user = user,
            key = secrets.token_hex(8),
            attempts = 0
        )
        return request

class Researcher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class MedicalStaff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class HealthRecord(models.Model):
    user = models.OneToOneField(Patient, on_delete=models.CASCADE, primary_key=True)
    dateofbirth = models.DateField()
    sex = models.CharField(max_length=2)
    height = models.DecimalField(max_digits=5,decimal_places=1)
    weight = models.DecimalField(max_digits=5,decimal_places=1)
    bloodtype = models.CharField(max_length=3)
    allergies = models.CharField(max_length=50)
    race = models.CharField(max_length=10)
    zipcode = models.CharField(max_length=6)
    address = models.CharField(max_length=100)

class Diagnosis(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
    description = models.TextField()


class ExaminationManager(models.Manager):
    def create_exam(self, sessionid, doctor, patient, code, prescription):
        exam = self.create(
            session_id=sessionid,
            doctor=doctor,
            patient=patient,
            diagnosis=code,
            prescription=prescription,
        )
        return exam


class Examination(models.Model):
    exam_id = models.CharField(max_length=50, primary_key=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    diagnosis = models.ForeignKey(Diagnosis, on_delete=models.CASCADE)
    prescription = models.CharField(max_length=50)
    examtime = models.DateTimeField(auto_now_add=True)

    objects = ExaminationManager()


class PendingExamManager(models.Manager):
    def create_exam(self, patient_obj):
        random_id = get_random_string(10)
        exam, created = PendingExamination.objects.get_or_create(
            patient=patient_obj, exam_id=random_id
        )
        if not created:
            return PendingExamination.objects.none()
        return exam


class PendingExamination(models.Model):
    patient = models.OneToOneField(Patient, primary_key=True, on_delete=models.CASCADE)
    doctor = models.OneToOneField(Doctor, on_delete=models.CASCADE, null=True)
    exam_id = models.CharField(max_length=10, unique=True)
    approved = models.BooleanField(default=False)

    objects = PendingExamManager()


class Crowd(models.Model):
    time_recorded = models.DateTimeField(auto_now_add=True, primary_key=True)
    count = models.IntegerField()

class AnonymizedRecord(models.Model):
    age_range = models.CharField(max_length=15)
    height_range = models.CharField(max_length=15)
    weight_range = models.CharField(max_length=15)
    allergies = models.CharField(max_length=15)
    race = models.CharField(max_length=10)
    zipcode = models.CharField(max_length=15)
    sex = models.CharField(max_length=2)
    diagnosis = models.CharField(max_length=10)