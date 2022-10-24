import datetime
from hashlib import pbkdf2_hmac
import sys
import csv
import string
import random
from random import randint
import base64
import secrets
import os
from faker import Faker

fake = Faker()
Faker.seed(secrets.randbits(3))
number_of_records = int(sys.argv[1])
number_of_examinations = int(sys.argv[2])
# Define max count per number of records for each role
medical_staff_max = 0.05 * number_of_records
researcher_max = 0.1 * number_of_records
doctor_max = 0.35 * number_of_records
patient_max = 0.5 * number_of_records

# List of all uuids

set_uid = set()
set_name = set()
set_researchers = set()
set_doctors = set()
set_patients = set()
set_staff = set()
set_exam_id = set()
list_prescriptions = []
list_diagnosis = []

# Function generates a hashed password of 12 characters
def generate_password():
    pw = os.urandom(12)
    salt = os.urandom(18)
    # key = pbkdf2_hmac('sha256', pw, salt, 390000)
    key = os.urandom(32)
    return (
        "pbkdf2_sha256$390000$"
        + base64.b64encode(salt).decode()
        + "$"
        + base64.b64encode(key).decode()
    )


# Function generates a unique identifier
def generate_uid():
    uid = secrets.token_hex(8)
    while uid in set_uid:
        uid = secrets.token_hex(8)
    set_uid.add(uid)
    return uid


# Function generates a user name where user name = "name" + "last_name"
def generate_username():
    username = fake.first_name() + "_" + fake.last_name()
    return username


# Function generates nric
def generate_nric():
    foo = ["S", "T"]
    first_letter = random.choice(foo)
    if first_letter == "S":
        birth_year = randint(68, 99)

    else:
        birth_year = randint(00, 15)

    last_five = randint(00000, 99999)

    last_letter = random.choice(string.ascii_uppercase)
    nric = first_letter + f"{birth_year:02d}" + f"{last_five:05d}" + last_letter
    return nric


# Function generates contact
def generate_contact():
    contact = randint(80000000, 99999999)
    return contact


# Function generates a random email domain string
def generate_domain():
    domains = ["gmail", "outlook", "yahoo"]
    domain_choice = random.choice(domains)
    email_domain = "@" + domain_choice + ".com"
    return email_domain


# Function generates random date of birth
def generate_dob():
    start_date = datetime.date(1930, 1, 1)
    end_date = datetime.date(2015, 2, 1)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return random_date


# Function generates random height
def generate_height():
    height = round(random.uniform(130.0, 200.0), 1)
    height_str = str(height)
    return height_str


# Function generates weight
def generate_weight():
    weight = round(random.uniform(40.0, 110.0), 1)
    weight_str = str(weight)
    return weight_str


# Function generates random blood type
def generate_bloodtype():
    bloodtype = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
    random_bt = random.choice(bloodtype)
    return random_bt


def generate_address():
    addr = fake.street_address()
    return addr, randint(300000, 900000)


def generate_allergies():
    types = [
        "Eggs",
        "Milk and Dairy",
        "Peanuts",
        "Tree nuts",
        "Fish",
        "Shellfish",
        "Wheat",
        "Soy",
        "Sesame",
    ]
    b = randint(0, 15)

    if b <= 12:
        return "None"
    else:
        return random.choice(types)


def generate_race():
    races = ["Chinese", "Malay", "Indian", "Others"]
    return random.choice(races)


def generate_examtime():
    start_date = datetime.datetime(
        2018, 1, 1, randint(0, 23), randint(0, 59), randint(0, 59)
    )
    end_date = datetime.datetime(
        2022, 2, 1, randint(0, 23), randint(0, 59), randint(0, 59)
    )
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return random_date


def generate_diagnosis():
    return random.choice(list_diagnosis), random.choice(list_prescriptions)


with open("prescriptions.txt", mode="r") as file:
    data = file.readlines()
    for line in data:
        list_prescriptions.append(line.rstrip())

with open("diagnosis.csv", mode="r") as file:
    for line in file:
        tokens = line.split(",")
        substr = tokens[0]
        list_diagnosis.append(substr)

# Generate medicalapp_users
with open("medicalapp_users.csv", mode="w", newline="\n") as file:
    file_writer = csv.writer(
        file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
    )
    list_nric = []
    for _ in range(number_of_records):
        uid = generate_uid()
        password = generate_password()
        nric = generate_nric()
        list_nric.append(nric)
        contact = generate_contact()
        while True:
            first_name = fake.first_name()
            last_name = fake.last_name()
            full_name = first_name + " " + last_name
            if full_name not in set_name:
                set_name.add(full_name)
                break
        user_name = str(first_name + "_" + last_name).lower()
        domain = generate_domain()
        email = user_name + domain
        file_writer.writerow(
            [
                "null",
                "f",
                uid,
                user_name,
                password,
                full_name,
                nric,
                contact,
                email,
                "t",
            ]
        )

# Seperate uids to different roles
length_to_split = [medical_staff_max, researcher_max, doctor_max, patient_max]
for count, uid in enumerate(set_uid):
    if count < medical_staff_max:
        set_staff.add(uid)
    elif count < researcher_max:
        set_researchers.add(uid)
    elif count < doctor_max:
        set_doctors.add(uid)
    else:
        set_patients.add(uid)


# Generate medicalapp_researchers
with open("medicalapp_researchers.csv", mode="w", newline="\n") as file:
    file_writer = csv.writer(
        file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
    )
    for x in set_researchers:
        file_writer.writerow([x])

# Generate medicalapp_doctors
with open("medicalapp_doctors.csv", mode="w", newline="\n") as file:
    file_writer = csv.writer(
        file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
    )
    for x in set_doctors:
        file_writer.writerow([x])

# Generate medicalapp_patient
with open("medicalapp_patient.csv", mode="w", newline="\n") as file:
    file_writer = csv.writer(
        file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
    )
    for x in set_patients:
        file_writer.writerow([x])

# Generate medicalapp_staff
with open("medicalapp_staff.csv", mode="w", newline="\n") as file:
    file_writer = csv.writer(
        file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
    )
    for x in set_staff:
        file_writer.writerow([x])

# Generate medicalapp.healthrecords
with open("medicalapp_healthrecords.csv", mode="w", newline="\n") as file:
    file_writer = csv.writer(
        file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
    )
    for id in set_patients:
        pid = id
        dob = generate_dob()
        sex = random.choice(["M", "F"])
        height = generate_height()
        weight = generate_weight()
        bloodtype = generate_bloodtype()
        allergies = generate_allergies()
        race = generate_race()
        address, zipcode = generate_address()
        file_writer.writerow(
            [
                pid,
                dob,
                height,
                weight,
                bloodtype,
                allergies,
                race,
                zipcode,
                address,
                sex,
            ]
        )

with open("medicalapp_examination.csv", mode="w", newline="\n") as file:
    file_writer = csv.writer(
        file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
    )
    count = 0
    while count < number_of_examinations:
        exam_id = secrets.token_hex(6)
        while exam_id in set_exam_id:
            exam_id = secrets.token_hex(6)
        diagnosis, prescription = generate_diagnosis()
        examtime = generate_examtime()
        patient_id = random.choice(list(set_patients))
        doctor_id = random.choice(list(set_doctors))
        file_writer.writerow(
            [exam_id, prescription, examtime, diagnosis, doctor_id, patient_id]
        )
        count += 1
