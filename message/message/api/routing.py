# routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from . import consumers

application = [re_path(r'ws/chat/(?P<slug1>\w+)/(?P<slug2>\w+)/$', consumers.ChatConsumer.as_asgi()),]
    

websocket_urlpatterns = application
