import statistics

from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user_profile = models.OneToOneField(User, on_delete=models.CASCADE)
    img_profile = models.ImageField(default='images/default.png', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user_profile.username}'


class Restaurant(models.Model):
    restaurant_name = models.CharField(max_length=30)
    location = models.CharField(max_length=30)
    photo = models.ImageField(upload_to='images/')
    detail = models.CharField(max_length=1000000)


    def review_amount(self):
        return self.review_set.count()

    def rating(self):
        if self.review_amount() is 0:
            return 0
        ratings = [r.review_rate for r in self.review_set.all()]
        avg_rate = round(statistics.mean(ratings))
        avg_rate = 1 if avg_rate is 0 else avg_rate
        return avg_rate


class Review(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    review_user = models.ForeignKey(User, on_delete=models.CASCADE)
    review_title = models.CharField(max_length=100)
    review_description = models.CharField(max_length=500)
    review_rate = models.IntegerField(default=0)
    review_price = models.IntegerField(default=0)
    review_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.review_description


class Comment(models.Model):
    review = models.ForeignKey(Review,on_delete=models.CASCADE)
    comment_user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_description = models.CharField(max_length=500)


    def __str__(self):
        return self.comment_description


class Reply(models.Model):
    comment = models.ForeignKey(Comment,on_delete=models.CASCADE)
    reply_user = models.ForeignKey(User, on_delete=models.CASCADE)
    reply_description = models.CharField(max_length=500)


    def __str__(self):
        return self.reply_description