# IFS4205-Group3-Crowdsensing-Med-App

## Local dev setup

### Environment (frontend)

1. `cd` into `frontend/`

2. Install `Node.js` which comes with `npm`: https://nodejs.org/en/download/

- Check that both are installed with the commands `node -v` and `npm -v`.

- If they were already installed previously, update `npm` by doing
  ```bash
  npm install -g npm@latest
  ```

3. Install `Axios`

```bash
npm i axios
```

4. (optional) Install `nodemon` for auto-reloading of app after changes are made

```bash
npm install --save-dev nodemon
```

5. `npm list` at this point should give similar result

```bash
frontend@0.1.0 path\to\clonedrepo\frontend
├── @testing-library/jest-dom@5.16.5
├── @testing-library/react@13.4.0
├── @testing-library/user-event@13.5.0
├── axios@0.27.2
├── react-dom@18.2.0
├── react-router-dom@6.4.1
├── react-scripts@5.0.1
├── react@18.2.0
└── web-vitals@2.1.4
```

&nbsp;

### Environment (backend)

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

- Issue: warnings on ["invalid distributions"](https://stackoverflow.com/questions/68880743/why-do-i-get-this-when-using-pip-warning-ignoring-invalid-distribution-ip) e.g. from previous versions that failed to be cleaned up
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

6. Install additional django libraries

```bash
python -m pip install djangorestframework
python -m pip install django-cors-headers
python -m pip install django-otp
```

&nbsp;

### DB

Summary of https://docs.djangoproject.com/en/4.1/intro/tutorial02/#database-setup

1. After activating `virtualenv`, `cd` to project root folder

2. Install Python-PostgreSQL DB adapter. For example

```bash
pip install psycopg2
```

3. Create database and user locally using `pgAdmin` or `psql`. For example

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

4. Edit `settings.py` as in [the tutorial](https://docs.djangoproject.com/en/4.1/intro/tutorial02/#database-setup). For example

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

5. Migrate

```bash
python manage.py migrate
```

- If face issue of ["inconsistent migration history"](https://stackoverflow.com/questions/44651760/django-db-migrations-exceptions-inconsistentmigrationhistory) due to migration files for the admin site being applied prematurely,
  comment out the parts that register the admin site app in the files below, run the command again and uncomment those parts - `ifs4205project/settings.py` - `ifs4205project/urls.py`

6. In `psql`, check tables that the user specified in `settings.py` exists and is their owner

```bash
\dt
```

- Step 5 should also have created all the tables needed for the apps in the database based on the files under `backend/migrations/`.
  Otherwise, run `python manage.py makemigrations` and try again.
