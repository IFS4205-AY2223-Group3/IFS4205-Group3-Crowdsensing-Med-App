from pydoc import doc
import random
import string
import hashlib
from random import randint
from itertools import accumulate
import uuid

height = random.randint(140,200)
height_str = str(height) + 'cm'
print( height_str)

# size = 100
# list_uid = []
# list_researchers = []
# list_doctors = []
# list_patients = []
# list_staff =[]

# medical_staff_max = 0.05 * size # 5 
# researcher_max = (0.1 * size) + medical_staff_max # 15
# doctor_max = (0.35 * size) + researcher_max #50
# patient_max = (0.5 * size) + doctor_max #50

# length_to_split  = [medical_staff_max, researcher_max, doctor_max, patient_max]
# for _ in range(size):
#     uid = uuid.uuid1()
#     list_uid.append(str(uid))

# print(list_uid)

# for count, uid in enumerate(list_uid):
#     if count < medical_staff_max:
#         list_staff.append(uid)
#     elif count < researcher_max:
#         list_researchers.append(uid)
#     elif count < doctor_max:
#         list_doctors.append(uid)
#     else:
#         list_patients.append(uid)

# print(len(list_staff))
# print(len(list_doctors))
# print(len(list_patients))
# print(len(list_researchers))

