# serializers.py
from rest_framework.serializers import ModelSerializer
from chat.models import Message

class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'username', 'content']
