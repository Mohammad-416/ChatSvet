#!/usr/bin/env bash


# Install requirements
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create a superuser
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('Mohammad', 'm9971359949@gmail.com', 'Mohammad@123')" | python manage.py shell

# Collect static files
python manage.py collectstatic