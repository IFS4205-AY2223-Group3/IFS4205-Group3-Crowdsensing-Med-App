"""
Django settings for ifs4205project project.
Generated by 'django-admin startproject' using Django 4.1.1.
For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
from django.core.exceptions import ImproperlyConfigured
from pathlib import Path
from corsheaders.defaults import default_headers
import os
import json

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/
try:
    with open(os.path.join(BASE_DIR, "secrets.json")) as secrets_file:
        secrets = json.loads(secrets_file.read())
    PRODUCTION = True
except OSError as e:
    PRODUCTION = False
    secrets = {}


def get_secret(setting, secrets=secrets):
    """Get secret setting or fail with ImproperlyConfigured"""
    try:
        return secrets[setting]
    except KeyError:
        raise ImproperlyConfigured("Set the {} setting".format(setting))


# SECURITY WARNING: keep the secret key used in production secret!
if PRODUCTION:
    SECRET_KEY = get_secret("SECRET_KEY")
else:
    SECRET_KEY = "+&-a*d+9^o1owr8otsv=zbvs&yjm4&4l!3&(s9#*ab2l#@roq"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

if PRODUCTION:
    ALLOWED_HOSTS = ["ifs4205-group3-backend-i.comp.nus.edu.sg"]
else:
    ALLOWED_HOSTS = ["localhost"]

CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = ["http://172.25.97.106:3000"]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = default_headers + (
    "access-control-allow-origin",
    "access-control-allow-headers",
    "access-control-allow-methods",
)
# Application definition

INSTALLED_APPS = [
    "django_otp",
    "django_otp.plugins.otp_totp",
    "corsheaders",
    "backend.apps.BackendConfig",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django_otp.middleware.OTPMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "ifs4205project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "ifs4205project.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

if PRODUCTION:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "HOST": get_secret("HOST"),
            "NAME": get_secret("NAME"),
            "USER": get_secret("USER"),
            "PASSWORD": get_secret("PASSWORD"),
            "OPTIONS": {
                "sslmode": "require",
            },
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": "mydatabase",
        }
    }


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ["backend.authentication.TokenAuth"],
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "EXCEPTION_HANDLER": "backend.exceptions.custom_handler",
    "DATETIME_FORMAT": "%a %b %d %Y %H:%M:%S",
    "TEST_REQUEST_DEFAULT_FORMAT": "json",
}

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {"format": "[{levelname}] [{asctime}] {message}", "style": "{"}
    },
    "handlers": {
        "file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": "backend.log",
            "formatter": "verbose",
        }
    },
    "handlers": {
        "file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": os.path.join(BASE_DIR, "backend.log"),
            "formatter": "verbose",
        },
    },
    "loggers": {
        "backend": {
            "handlers": ["file"],
            "level": "INFO",
            "propagate": True,
        },
    },
}


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Singapore"

USE_I18N = True

USE_TZ = True

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.office365.com"
EMAIL_PORT = 587

if PRODUCTION:
    EMAIL_HOST_USER = get_secret("EMAIL_HOST_USER")
    DEFAULT_FROM_EMAIL = get_secret("EMAIL_HOST_USER")
    EMAIL_HOST_PASSWORD = get_secret("EMAIL_HOST_PASSWORD")
else:
    EMAIL_HOST_USER = "default_user"
    DEFAULT_FROM_EMAIL = "default"
    EMAIL_HOST_PASSWORD = "password"

EMAIL_USE_TLS = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
AUTH_USER_MODEL = "backend.User"
