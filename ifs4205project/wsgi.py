"""
WSGI config for ifs4205project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application
sys.path.append('/home/sadm/Backend/IFS4205-Group3-Crowdsensing-Med-App')
sys.path.append('/home/sadm/Backend/IFS4205-Group3-Crowdsensing-Med-App/ifs4205project')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ifs4205project.settings")

application = get_wsgi_application()
