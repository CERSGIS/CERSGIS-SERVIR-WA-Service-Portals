"""
Django settings for servir-portals project.

Generated by 'django-admin startproject' using Django 3.1.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = eval(os.environ.get('DEBUG'))

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', default=['*']).split(',')
CSRF_TRUSTED_ORIGINS = os.environ.get('CSRF_TRUSTED_ORIGINS', default=['*']).split(',')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',

    'colorfield',
    'drf_yasg',
    'rest_framework',
    'home',
    'root_app',
    'galamsey_portal.apps.GalamseyPortalConfig',
    'charcoal_portal.apps.CharcoalPortalConfig',
    'landscape_gh.apps.LandscapeGhConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'servir-portals.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'servir-portals.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
DATABASE_ROUTERS = ['servir-portals.DefaultRouter.DefaultRouter','servir-portals.GalamseyPortalRouter.GalamseyPortalRouter', 'servir-portals.CharcoalPortalRouter.CharcoalPortalRouter','servir-portals.LandscapeGhRouter.LandscapeGhRouter']

DATABASES = {
 
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.environ.get('POSTGRES_DB'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': os.environ.get('POSTGRES_HOST'),
        'PORT': os.environ.get('POSTGRES_PORT'),
    },
    'galamsey-portal': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.environ.get('GALAMSEY_DB'),
        'USER': os.environ.get('GALAMSEY_USER'),
        'PASSWORD': os.environ.get('GALAMSEY_PASSWORD'),
        'HOST': os.environ.get('GALAMSEY_HOST'),
        'PORT': os.environ.get('GALAMSEY_PORT'),
    },
    'charcoal-portal': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.environ.get('CHARCOAL_DB'),
        'USER': os.environ.get('CHARCOAL_USER'),
        'PASSWORD': os.environ.get('CHARCOAL_PASSWORD'),
        'HOST': os.environ.get('CHARCOAL_HOST'),
        'PORT': os.environ.get('CHARCOAL_PORT'),
    },
    'landscape-gh': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.environ.get('LANDSCAPE_DB'),
        'USER': os.environ.get('LANDSCAPE_USER'),
        'PASSWORD': os.environ.get('LANDSCAPE_PASSWORD'),
        'HOST': os.environ.get('LANDSCAPE_HOST'),
        'PORT': os.environ.get('LANDSCAPE_PORT'),
    }
}

# Caches
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': os.environ.get('CACHE_LOCATION'),
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

if not DEBUG:
# S3
    DEFAULT_FILE_STORAGE = os.environ.get('DEFAULT_FILE_STORAGE')
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
    AWS_QUERYSTRING_AUTH = os.environ.get('AWS_QUERYSTRING_AUTH')

    AWS_S3_SIGNATURE_VERSION = 's3v4'
    AWS_S3_REGION_NAME='eu-central-1'

    STATICFILES_STORAGE = 'servir-portals.storage_backends.StaticStorage'

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = "/media/"

# Email
EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS')
EMAIL_HOST = os.environ.get('EMAIL_HOST')
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_PORT = os.environ.get('EMAIL_PORT')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# GEE CREDENTIALS STUFFS
SERVICE_ACCOUNT_NAME = os.environ.get('SERVICE_ACCOUNT_NAME')
SERVICE_ACCOUNT_KEY = os.environ.get('SERVICE_ACCOUNT_KEY')
PROJECT_ASSETS = os.environ.get('PROJECT_ASSETS')
PLANET_PROJECT_ASSETS = os.environ.get('PLANET_PROJECT_ASSETS')

# GEOSERVER BASE URL
GEOSERVER_BASE_URL = os.environ.get('GEOSERVER_BASE_URL')

SERIALIZATION_MODULES = {
    "geojson": "django.contrib.gis.serializers.geojson", 
}

CACHE_TIMEOUT = os.environ.get('CACHE_TIMEOUT')