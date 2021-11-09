from django.urls import path
from . import views

app_name = "wongnork"


urlpatterns = [
    path("register/", views.register_request, name="register"),
    path("login/", views.login_request, name="login"),
    path("home-page",views.index, name="home-page"),
    path("user-profile", views.user_profile, name="user-profile"),
    path("logout/", views.logout_request, name="logout")
]
