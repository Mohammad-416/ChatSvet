"""
URL configuration for message project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include

def index_view(request):
    return render(request, 'index.html')

def login_view(request):
    return render(request, 'index.html')

def register_view(request):
    return render(request, 'index.html')

def inbox_view(request):
    return render(request, 'index.html')

def about_view(request):
    return render(request, 'index.html')
    
def contact_view(request):
    return render(request, 'index.html')

def chat_view(request, slug):
    print(request.user ,slug)
    return render(request, 'index.html')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('authApp/', include('authApp.urls')),
    path('', index_view, name='index_view'),
    path('login/', login_view, name='login_view'),
    path('about/', about_view, name='about_view'),
    path('contact/', contact_view, name='contact_view'),
    path('register/', register_view, name='register_view'),
    path('inbox/', inbox_view, name='inbox_view'),
    path('chat/<slug:slug>', chat_view, name='chat_view'),
    path('inboxApi/', include('inbox.urls')),
]
