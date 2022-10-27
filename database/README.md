# Getting Started with MediBook

## Database Local Setup

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

&nbsp;
