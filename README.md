# IFS4205-Group3-Crowdsensing-Med-App

## Local dev setup

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

4. Install Django
```bash
python -m pip install Django
```

5. VS Code
- Relevant extensions:
    - Django (batisteo.vscode-django)
    - Python (ms-python.python), comes with Pylance
- If face issue of "unresolved import" after opening the Python files, [select Python interpreter](https://stackoverflow.com/questions/53939751/pylint-unresolved-import-error-in-visual-studio-code) (e.g. use the one in the `virtualenv` folder)

&nbsp;

### DB

Summary of https://docs.djangoproject.com/en/4.1/intro/tutorial02/#database-setup

1. Install Python-PostgreSQL DB adapter. For example
```bash
pip install psycopg2
```

2. Create database and user locally using `pgAdmin` or `psql`. For example

- Login as superuser "postgres" in `psql`:
```
Server [localhost]:
Database [postgres]: ifs4205
Port [5432]:
Username [postgres]:
Password for user postgres: //enter pw
```

- List all users in the current database server:
```
\du+ 
```

- Create the account "test_user" with permission to create databases:
```bash
CREATE USER test_user WITH PASSWORD 'test_user' CREATEDB; 
```

- Re-login in `psql` as newly created user, check which user we are:
```
\conninfo
```

3. Edit `settings.py` as in the tutorial. For example
```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': '',
        'NAME': 'ifs4205',
        'USER': 'test_user',
        'PASSWORD': 'test_user',
    }
}
...
TIME_ZONE = 'Asia/Singapore'
```

4. Migrate
```bash
python manage.py migrate
```

5. Check tables created in `psql` for the user specified in `settings.py`
```bash
\dt
```
