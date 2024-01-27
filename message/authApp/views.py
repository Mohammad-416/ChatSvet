from django.shortcuts import render, redirect

# Create your views here.
import json
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User
from .models import Profile
from django.views.decorators.http import require_POST
from .emailbackend import EmailBackend
import os


def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get("username").lower()
        password = data.get("password")
        print("Inside Login View", username ,password)
        if username is None or password is None:
            print("Please provide username and password")
            return JsonResponse({"detail":"Please provide username and password"}, status=400)
    
        user_obj = User.objects.filter(username = username)
        
        if not user_obj.exists():
            print("invalid credentials")
            return JsonResponse({"detail":"invalid credentials"}, status=400)
        
        if not user_obj[0].profile.is_email_verified:
            return JsonResponse({"detail":"Account Not Verified."}, status=400)
    
        user_obj = authenticate( request, username=username, password=password)
        print(user_obj)
        if user_obj:
            login(request, user_obj)
            print("Succesfully logged in!")
            return JsonResponse({"details": "Succesfully logged in!", "username" : username}, status=200)
        
        return JsonResponse({"detail": "Invalid credentials"}, status=400)

    return JsonResponse({"details": "Request method should be post"}, status=400)
        

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail":"You are not logged in!"}, status=400)
    logout(request)
    return JsonResponse({"detail": "Success logged out!"}, status=200)
    


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False, 'csrf_token': request.COOKIES['csrftoken']})
    return JsonResponse({"isAuthenticated": True })

def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    return JsonResponse({"username":request.user.username})


def activate_email(request, email_token):
    try:
        redirect_url = os.environ.get("REDIRECT_URL")
        user = Profile.objects.get(email_token= email_token)
        user.is_email_verified = True
        user.save()
        return redirect(redirect_url)
    except Exception as e:
        return JsonResponse({"details": "Invalid Email Token"}, status=400)
    

def register_page(request):
    
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        username = data.get('username').lower()
        password = data.get('password')
    
        user_obj = User.objects.filter(username = username)
        print(user_obj, name, email, username, password)
        if user_obj.exists() or User.objects.filter(email = email).exists():    
            return HttpResponseRedirect(request.path_info)
    
        user_obj = User.objects.create(first_name = name, last_name = '', email = email, username = username)
        user_obj.set_password(password)
        user_obj.save()
        
        
        return JsonResponse({"details": "User Created Successfully"}, status=200)
    
    return JsonResponse({"details": "Request method should be post"}, status=400)