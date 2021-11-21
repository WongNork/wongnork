from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .forms import EditProfileForm
from django.contrib.auth import update_session_auth_hash
import datetime
from .api import get_restaurant_data

# Create your views here.
from .models import Restaurant,Review


def profile(request):
    return render(request, 'user_profile.html')


def index(request):
    """Views for home page"""
    restaurants = Restaurant.objects.all()
    return render(request, 'home_page.html', {"restaurants": restaurants})


def review(request, restaurant_id):
    """Views for review page"""
    restaurant = Restaurant.objects.filter(pk=restaurant_id).first()
    return render(request, 'review_page.html', {"restaurant": restaurant})

def restaurants(request):
    """Views for restaurants page"""
    restaurants = Restaurant.objects.all()
    return render(request,'restaurants.html',{"restaurants": restaurants})

def user_profile(request):
    if request.user.is_authenticated:
        return render(request, 'user_profile.html')
    else:
        messages.error(request, "You are not login!")
        return redirect('wongnork:login')



def register_request(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful.")
            return redirect('wongnork:home-page')
        messages.error(
            request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    return render(request, "register.html", {"register_form": form})


def login_request(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now logged in as {username}.")
                return redirect("wongnork:home-page")
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request, "login.html", {"login_form": form})


def logout_request(request):
    logout(request)
    messages.info(request, "You have successfully logged out.")
    return redirect("wongnork:login")


@login_required
def reviewed(request, restaurant_id):
    rtg = request.POST.get("rate", 1)
    p = request.POST.get("price", 1)
    review_title = request.POST.get("review_title")
    review_des = request.POST.get("review_des")
    print(review_title, review_des)
    res = get_object_or_404(Restaurant, pk=restaurant_id)
    Review.objects.create(restaurant=res, review_user=request.user, review_title=review_title,
                          review_description=review_des, review_rate=rtg, review_price=p,
                          review_date=datetime.datetime.now())
    return render(request, 'review_page.html', {'restaurant': res, 'user': request.user})


@login_required
def add(request, restaurant_id):
    res = get_object_or_404(Restaurant, pk=restaurant_id)
    return render(request, 'wongnork/add.html', {'restaurant': res})


@login_required
def edit_profile(request):
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=request.user)

        if form.is_valid():
            user_form = form.save()
            user_form.save()
            return redirect('wongnork:user-profile')
    else:
        form = EditProfileForm(instance=request.user)
        args = {}
        args['edit_form'] = form
        return render(request, 'edit_profile.html', args)