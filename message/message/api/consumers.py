# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'test'
        self.slug = self.scope['path'].split('/')[4].lower()
        self.user = self.scope['path'].split('/')[3].lower()
        print(self.slug, self.user)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        await self.fetch_messages(None)

    async def disconnect(self, close_code):
        pass

    @database_sync_to_async
    def save_message_to_database(self, content):
        from chat.models import Message
        from django.contrib.auth.models import User
        sender_message = Message(
            username=User.objects.get(username=self.user),
            sender = User.objects.get(username=self.user),
            reciepient = User.objects.get(username=self.slug),
            content = content,
            is_read = True
            )
        sender_message.save()
    
        reciepient_message = Message(
            username= User.objects.get(username=self.slug),
            sender = User.objects.get(username=self.user),
            reciepient = User.objects.get(username=self.slug),
            content = content,
            is_read = True
            )
        reciepient_message.save()
        return sender_message
        #return Message.objects.create(username=username, content=content)
    
    @database_sync_to_async
    def get_message_from_database(self):
        from chat.models import Message
        from .serializers import MessageSerializer
        from django.contrib.auth.models import User
        from django.db.models import Max
        # Assuming self.user contains the username
        user_instance = User.objects.get(username=self.user)
        users = []
        messages = Message.objects.filter(username=user_instance).values('reciepient', 'content', 'sender').annotate(last=Max('date')).order_by('-last')
        for message in messages:
            if((User.objects.get(pk=message['sender']).username == self.user and User.objects.get(pk=message['reciepient']).username == self.slug) or (User.objects.get(pk=message['reciepient']).username == self.user and User.objects.get(pk=message['sender']).username == self.slug)):
                users.append({
                    'sender': User.objects.get(pk=message['sender']).username,
                    'user' : User.objects.get(pk=message['reciepient']).username,
                    'last': message['last'].isoformat() if message['last'] else None,
                    'content':  message['content'],
                    'unread': Message.objects.filter(username=user_instance, reciepient__pk=message['reciepient'], is_read=False).count()
                })
        #messages = Message.objects.all()
        print(users)
        return users

    async def fetch_messages(self, event):
    
        serialized_messages = await self.get_message_from_database()

        await self.send(text_data=json.dumps({
            'type': 'fetch_messages',
            'messages': serialized_messages
        }))

        

        

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        

        await self.save_message_to_database(content= message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'fetch_messages',
                'message': message,
                'username': self.user
            }
        )

        