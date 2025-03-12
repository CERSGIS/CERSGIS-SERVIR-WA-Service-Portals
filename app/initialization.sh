#!/bin/bash

# Collecting static files
echo "Collect static files"
python manage.py collectstatic --noinput

# Apply database migrations
echo "Applying default database migrations"
python manage.py migrate admin --database=default
python manage.py migrate auth --database=default
python manage.py migrate contenttypes --database=default
python manage.py migrate sessions --database=default
python manage.py migrate messages --database=default
python manage.py migrate home --database=default
python manage.py migrate root_app --database=default

echo "Applying Galamsey database migrations"
# Galamsey Migrations
python manage.py migrate galamsey_portal --database=galamsey-portal

echo "Applying Charcoal database migrations"
# Charcoal Migrations
python manage.py migrate charcoal_portal --database=charcoal-portal

echo "Applying Landscape database migrations"
# Landscape Migrations
python manage.py migrate landscape_gh --database=landscape-gh

# Running the Server
echo "Running the Application"
gunicorn servir-portals.wsgi:application --timeout 1200 --workers 5  --bind 0.0.0.0:8000 --error-logfile -