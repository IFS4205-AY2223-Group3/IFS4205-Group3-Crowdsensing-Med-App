from pyexpat import model
from statistics import mode
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.crypto import get_random_string

class CustomAccountManager(BaseUserManager):
    def create_user(self, username, email, password, **other_fields):
        if not email:
            raise ValueError(_('You must provide an email address'))
        
        user = self.model(email=self.normalize_email(email), username=username, **other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password, **other_fields):
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('emailverified', True)

        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, username, password, **other_fields)

class User(AbstractBaseUser, PermissionsMixin):
    userid = models.CharField(max_length=16, primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)
    name = models.CharField(max_length=50)
    nric = models.CharField(max_length=9)
    contact = models.CharField(max_length=8)
    email = models.EmailField(max_length=50, unique=True)
    emailverified = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ('email',)

    def save(self, *args, **kwargs):
        if not self.userid:
            self.userid = get_random_string(16)
        super().save(*args, **kwargs)

    objects = CustomAccountManager()
        
class Researcher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_column='userid')

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_column='userid')
    
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_column='userid')

class MedicalStaff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_column='userid')

class HealthRecords(models.Model):
    user = models.OneToOneField(Patient, on_delete=models.CASCADE, primary_key=True, db_column='userid')
    dateofbirth = models.DateField()
    height = models.IntegerField()
    weight = models.IntegerField()
    bloodtype = models.CharField(max_length=3)
    allergies = models.CharField(max_length=50)

class Diagnosis(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
    description = models.TextField()

class Examinations(models.Model):
    sessionid = models.CharField(max_length=10, primary_key=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, db_column='doctorid')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, db_column='patientid')
    code = models.ForeignKey(Diagnosis, on_delete=models.CASCADE, db_column='code')
    prescription = models.CharField(max_length=50)
    sessiontime = models.DateTimeField(auto_now_add=True)

class SessionManager(models.Manager):
    def create_session(self, patientid):
        new_session = PendingSessions.create(patientid=patientid)
        new_session.sessionid = get_random_string(10)
        return new_session

class PendingSessions(models.Model):
    patient = models.OneToOneField(Patient, primary_key=True, on_delete=models.CASCADE, db_column='patientid')
    doctor = models.OneToOneField(Doctor, on_delete=models.CASCADE, db_column='doctorid', null=True)
    sessionid = models.CharField(max_length=10)
    approved = models.BooleanField(default=False)

    objects =  SessionManager()

class Crowd(models.Model):
    time_recorded = models.DateTimeField(auto_now_add=True, primary_key=True)
    count = models.IntegerField()


        