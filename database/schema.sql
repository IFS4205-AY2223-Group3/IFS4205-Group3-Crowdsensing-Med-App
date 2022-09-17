DROP DATABASE IF EXISTS project;
CREATE DATABASE project;

\c project;

CREATE SCHEMA medicalapp;

CREATE TABLE medicalapp.Users (
	userid 	varchar(50) PRIMARY KEY,
	username	varchar(50) NOT NULL,
	hashedpw	varchar(50) NOT NULL,
	salt		varchar(50) NOT NULL,
	name		varchar(50) NOT NULL,
	nric		varchar(9) NOT NULL,
	contact	varchar(8) NOT NULL,
	email		varchar(50) NOT NULL,
	emailverified	boolean default false
);

CREATE TABLE medicalapp.Researchers (
	userid 	varchar(50) PRIMARY KEY,
	FOREIGN KEY (userid) REFERENCES medicalapp.Users
);

CREATE TABLE medicalapp.MedicalStaff (
	userid 	varchar(50) PRIMARY KEY,
	FOREIGN KEY (userid) REFERENCES medicalapp.Users
);

CREATE TABLE medicalapp.Doctors (
	userid 	varchar(50) PRIMARY KEY,
	FOREIGN KEY (userid) REFERENCES medicalapp.Users
);

CREATE TABLE medicalapp.Patients (
	userid 	varchar(50) PRIMARY KEY,
	FOREIGN KEY (userid) REFERENCES medicalapp.Users
);

CREATE TABLE medicalapp.HealthRecords (
	patientid 		varchar(50) PRIMARY KEY,
	dateofbirth		date NOT NULL,
	height			integer NOT NULL,
	weight			integer NOT NULL,
	bloodtype		varchar(3) NOT NULL,
	allergies		varchar(50),
	FOREIGN KEY (patientid) REFERENCES medicalapp.Patients
);

CREATE TABLE medicalapp.Diagnosis (
	code			varchar(10) PRIMARY KEY,
	description		text
);

CREATE TABLE medicalapp.Examinations (
	sessionid		varchar(50) PRIMARY KEY,
	doctorid		varchar(50),
	patientid		varchar(50),
	code			varchar(10),
	prescription		varchar(30),
	sessiontime		timestamp NOT NULL,
	FOREIGN KEY (doctorid) REFERENCES medicalapp.Doctors,
	FOREIGN KEY (patientid) REFERENCES medicalapp.Patients,
	FOREIGN KEY (code) REFERENCES medicalapp.Diagnosis
);

CREATE TABLE medicalapp.AnonymisedRecords (
	hashid	varchar(50) PRIMARY KEY,
	agerange varchar(50) NOT NULL,
	heightrange varchar(50) NOT NULL,
	weightrange varchar(50) NOT NULL,
	bloodtype varchar(3) NOT NULL,
	allergies varchar(50)
)

CREATE TABLE medicalapp.Crowd (
	time_recorded	timestamp PRIMARY KEY,
	total_count 	integer NOT NULL,
	CHECK(total_count >= 0) 
);

