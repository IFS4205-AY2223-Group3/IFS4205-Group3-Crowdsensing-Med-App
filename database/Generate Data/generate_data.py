import datetime
import sys
import csv
import string    
import random 
from random import randint
import hashlib
import uuid
from faker import Faker

fake = Faker()
number_of_records = int(sys.argv[1])

# Define max count per number of records for each role
medical_staff_max = 0.05 * number_of_records
researcher_max = 0.1 * number_of_records
doctor_max = 0.35 * number_of_records
patient_max = 0.5 * number_of_records

# List of all uuids
list_uid = []
list_researchers = []
list_doctors = []
list_patients = []
list_staff =[]

# Function generates a hashed password of 12 characters
def generate_hashedpw():
    ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 12))
    hash_pw = hashlib.md5(ran.encode())
    hex_dig = hash_pw.hexdigest()
    return hex_dig

# Function generates a unique identifier 
def generate_uid():
    uid = uuid.uuid1()
    return uid

# Function generates a user name where user name = "name" + "last_name"
def generate_username():
    username = fake.first_name() + '_' + fake.last_name()
    return username

# Function generates nric
def generate_nric():
    foo = ['S','T']
    first_letter = random.choice(foo)
    last_letter = random.choice(string.ascii_uppercase)
    random_number = randint(0000000, 99999999)
    nric =  first_letter + str(random_number) + last_letter
    return nric

# Function generates contact 
def generate_contact():
    contact = randint(90000000, 99999999)
    return contact

# Function generates a salt
def generate_salt():
    salt = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(10))
    return salt 

# Function generates a random email domain string
def generate_domain():
    domains = ['gmail','outlook','yahoo']
    domain_choice = random.choice(domains)
    email_domain = '@' + domain_choice + '.com'
    return email_domain

# Function generates random date of birth
def generate_dob():
    start_date = datetime.date(1930, 1, 1)
    end_date = datetime.date(2021, 2, 1)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return random_date

# Function generates random height
def generate_height():
    height = round(random.uniform(130.0,200.0),1)
    height_str = str(height) + 'cm'
    return height_str

# Function generates weight
def generate_weight():
    weight = round(random.uniform(40.0,110.0),1)
    weight_str = str(weight) + 'kg'
    return weight_str


# Function generates random blood type
def generate_bloodtype():
    bloodtype = ['A+','A-','B+','B-','O+','O-','AB+','AB-']
    random_bt = random.choice(bloodtype)
    return random_bt


# Generate medicalapp_users
with open('medicalapp_users.csv', mode='w') as file:
  file_writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
  file_writer.writerow(['userid', 'username', 'hashedpw','salt','name','nric','contact','email','emailverified'])

  for _ in range(number_of_records):
        uid = generate_uid()
        list_uid.append(uid) # Append all uid to uid
        password = generate_hashedpw()
        salt = generate_salt()
        nric = generate_nric()
        contact = generate_contact
        first_name = fake.first_name()
        last_name = fake.last_name()
        full_name = first_name + ' ' + last_name
        user_name = first_name + '_' + last_name
        domain = generate_domain()
        email = user_name + domain
        file_writer.writerow([uid,user_name,password,salt,full_name,nric,contact,email,'false'])

# Seperate uids to different roles
length_to_split  = [medical_staff_max, researcher_max, doctor_max, patient_max]
for count, uid in enumerate(list_uid):
    if count < medical_staff_max:
        list_staff.append(uid)
    elif count < researcher_max:
        list_researchers.append(uid)
    elif count < doctor_max:
        list_doctors.append(uid)
    else:
        list_patients.append(uid)


# Generate medicalapp_researchers
with open('medicalapp_researchers.csv', mode='w') as file:
  file_writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
  file_writer.writerow(['userid'])

  for x in list_researchers:
        file_writer.writerow([x])

# Generate medicalapp_doctors
with open('medicalapp_doctors.csv', mode='w') as file:
  file_writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
  file_writer.writerow(['userid'])

  for x in list_doctors:
        file_writer.writerow([x])

# Generate medicalapp_patient
with open('medicalapp_patient.csv', mode='w') as file:
  file_writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
  file_writer.writerow(['userid'])

  for x in list_patients:
        file_writer.writerow([x])

# Generate medicalapp_staff
with open('medicalapp_staff.csv', mode='w') as file:
  file_writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
  file_writer.writerow(['userid'])

  for x in list_staff:
        file_writer.writerow([x])

# Generate medicalapp.healthrecords
with open('medicalapp_healthrecords.csv', mode='w') as file:
  file_writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
  file_writer.writerow(['patientid','dateofbirth','height','weight','bloodtype','allergies'])

  for id in list_patients:
        pid = id
        dob = generate_dob()
        height = generate_height()
        weight = generate_weight()
        bloodtype = generate_bloodtype()
        file_writer.writerow([pid,dob,height,weight,bloodtype,'NA'])