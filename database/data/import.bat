psql -U postgres -c "\c ifs4205" -c "\copy backend_user FROM './medicalapp_users.csv' with (delimiter ',', null 'null', format csv);" -c "\copy backend_patient FROM './medicalapp_patient.csv' with (delimiter ',', null 'null', format csv);" -c "\copy backend_doctor FROM './medicalapp_doctors.csv' with (delimiter ',', null 'null', format csv);" -c "\copy backend_medicalstaff FROM './medicalapp_staff.csv' with (delimiter ',', null 'null', format csv);" -c "\copy backend_researcher FROM './medicalapp_researchers.csv' with (delimiter ',', null 'null', format csv);" -c "\copy backend_healthrecord FROM './medicalapp_healthrecords.csv' with (delimiter ',', null 'null', format csv);"