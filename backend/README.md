# Getting Started with MediBook

## Backend Local Setup

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

7. Make migrations in the database

```bash
python manage.py makemigrations
python manage.py migrate
```

8. Start the server

```bash
python manage.py runserver
```

&nbsp;
