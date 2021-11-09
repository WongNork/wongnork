from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user_profile = models.OneToOneField(User, on_delete=models.CASCADE)
    img_profile = models.ImageField(default='images/default.png', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username}'

class Restaurant(models.Model):

    restaurant_name = models.CharField(max_length=30)
    location = models.CharField(max_length=30)
    photo = models.ImageField(upload_to='images/')
    detail = models.CharField(max_length=1000000)
    rating = models.FloatField(max_length=5)



    def __init__(self, name, location_string, photo):
        self.name = name
        self.location_string = location_string
        self.photo = photo

