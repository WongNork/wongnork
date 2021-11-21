from django.urls import path
from . import views

app_name = "wongnork"


urlpatterns = [
    path("register/", views.register_request, name="register"),
    path("login/", views.login_request, name="login"),
    path("home-page/",views.index, name="home-page"),
    path("restaurants/",views.restaurants, name="restaurants_page"),
    path("review/<int:restaurant_id>/", views.review, name="review"),
    path('review/<int:restaurant_id>/add/', views.add, name="add"),
    path('review/<int:restaurant_id>/reviewed/', views.reviewed, name='reviewed'),
    path("user-profile/", views.user_profile, name="user-profile"),
    path("logout/", views.logout_request, name="logout"),
    path("edit-profile/", views.edit_profile, name="edit-profile"),
]
