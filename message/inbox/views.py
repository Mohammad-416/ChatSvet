from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from authApp.models import Profile
from django.contrib.auth.decorators import user_passes_test

def inbox(request):
    if request.user.is_authenticated:
        Usersdata =  User.objects.all()
        data = []
        for x in Usersdata:
            print(x)
            if x.profile:
                if x.profile.is_email_verified:
                    data.append({"id": x.id, "username": x.username, "name": x.first_name})
            else:
                print("user skipped" , x)
        return JsonResponse({"data" : data})
    else:
        return redirect('/login/')
    