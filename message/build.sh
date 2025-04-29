#!/usr/bin/env bash

# Delete all migration files (except __init__.py)
echo "🧹 Deleting old migration files..."
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete

# Install Python requirements
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Navigate to MessageApp and install Node.js dependencies
echo "📁 Entering MessageApp and installing Node packages..."
cd MessageApp
npm install
cd ..

# Recreate migrations
echo "🛠️ Running makemigrations..."
python manage.py makemigrations --verbosity 2

# Specifically make migrations for authApp
echo "🔧 Making migrations for authApp..."
python manage.py makemigrations authApp --verbosity 3

# Migrate only authApp
echo "📥 Applying migrations for authApp..."
python manage.py migrate authApp --verbosity 3

# Migrate the rest
echo "🚀 Running full migrate..."
python manage.py migrate --verbosity 2

# Create a superuser
echo "👤 Creating superuser..."
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('Mohammad', 'm9971359949@gmail.com', 'Mohammad@123')" | python manage.py shell

# Collect static files
echo "📦 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Setup complete."
