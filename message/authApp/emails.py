from django.conf import settings
from django.core.mail import send_mail
from django.urls import reverse
import os

def send_account_activation_email(email, email_token):
    subject = 'Your account needs to be verified'
    email_from = settings.EMAIL_HOST_USER
    # Generate the activation link
    activation_url = reverse('activate', kwargs={'email_token': email_token})
    redirect_url = os.environ.get("REDIRECT_URL")
    # Construct the complete URL (including the domain if needed)
    complete_url = f'{redirect_url}{activation_url}'
    message = f'Hi, click on this link to verify your account ' + complete_url
    


    send_mail(subject, message, email_from, [email])