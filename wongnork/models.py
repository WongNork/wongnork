from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user_profile = models.OneToOneField(User, on_delete=models.CASCADE)
    img_profile = models.ImageField(default='images/default.png', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username}'
