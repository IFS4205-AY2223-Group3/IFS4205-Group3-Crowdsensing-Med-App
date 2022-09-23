# IFS4205-Group3-Crowdsensing-Med-App

## Generate Data Set up to generate CSV for Users, Researchers, Doctors, MedicalStaff, Patients and HealthRecords

&nbsp;

### Environment

Summary of https://docs.djangoproject.com/en/4.1/intro/install/

1. Install Python

2. Get latest `pip`, `setuptools`, `wheel`:
```
py -m pip install --upgrade
```
- Issue: has previous version of `pip`, encounter error during upgrade
```bash
python -m pip uninstall pip //should uninstall previous version and keep new verion
```
- Issue: warnings on [invalid distributions](https://stackoverflow.com/questions/68880743/why-do-i-get-this-when-using-pip-warning-ignoring-invalid-distribution-ip) e.g. from previous versions that failed to be cleaned up
    - `cd` into directories containing these files (start with `~`)
    - `rm` them


3. [Virtual Environment](https://docs.python.org/3/tutorial/venv.html)
- Create `virtualenv`
```bash
python3 -m venv tutorial-env
```
- then activate it
```bash
//Windows
tutorial-env\Scripts\activate.bat //OR: tutorial-env\Scripts\activate.ps1

//Unix, MacOS
source tutorial-env/bin/activate
```


### Generate Data

1. Run the command where X is the number of records you want to be randomly generated
```
python3 generate_data.py X
```

2. In the same directory, the csv with the dataset will be created
