from pyexpat import model
from statistics import mode
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

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
    userid = models.CharField(max_length=50, primary_key=True, unique=True)
    username = models.CharField(max_length=50, unique=True)
    hashedpw = models.CharField(max_length=50)
    salt = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    nric = models.CharField(max_length=9)
    contact = models.CharField(max_length=8)
    email = models.EmailField(max_length=50, unique=True)
    emailverified = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ('email',)

    objects = CustomAccountManager()
        
class Researcher(models.Model):
    userid = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_column='userid')

class Patient(models.Model):
    userid = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_column='userid')
    
class Doctor(models.Model):
    userid = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_column='userid')

class MedicalStaff(models.Model):
    userid = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_column='userid')

class HealthRecords(models.Model):
    userid = models.OneToOneField(Patient, on_delete=models.CASCADE, primary_key=True, db_column='userid')
    dateofbirth = models.DateField()
    height = models.IntegerField()
    weight = models.IntegerField()
    bloodtype = models.CharField(max_length=3)
    allergies = models.CharField(max_length=50)

class Diagnosis(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
    description = models.TextField()

class Examinations(models.Model):
    sessionid = models.CharField(max_length=50, primary_key=True)
    doctorid = models.OneToOneField(Doctor, on_delete=models.CASCADE, db_column='doctorid')
    patientid = models.OneToOneField(Patient, on_delete=models.CASCADE, db_column='patientid')
    code = models.OneToOneField(Diagnosis, on_delete=models.CASCADE, db_column='code')
    prescription = models.CharField(max_length=50)
    sessiontime = models.DateTimeField(auto_now_add=True)


        