from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password



class EmailBackend(ModelBackend):
   def authenticate(self, request, username=None, password=None, **kwargs):
       UserModel = get_user_model()
       try:
           user = UserModel.objects.get(username=username)
           raw_password = password
           hashed_password = make_password(raw_password)
           print(user, raw_password, hashed_password)
       except UserModel.DoesNotExist:
           return None
       else:
           if user.password == hashed_password:
               return user

   def get_user(self, user_id):
       UserModel = get_user_model()
       try:
           return UserModel.objects.get(pk=user_id)
       except UserModel.DoesNotExist:
           return None