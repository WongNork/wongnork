from django.contrib import admin
from .models import *

admin.site.register(UserProfile)
admin.site.register(Restaurant)
admin.site.register(Review)
admin.site.register(Comment)
admin.site.register(Reply)
