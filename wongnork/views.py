from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .forms import EditProfileForm

import datetime
from .api import get_restaurant_data

# Create your views here.
from .models import *


def search_bar(request):
    if request.method == "POST":
        searched = request.POST['searched']
        restaurant = Restaurant.objects.filter(
            restaurant_name__contains=searched)
        return render(request, 'search_result.html',
                      {'searched': searched, 'restaurant': restaurant})
    else:
        return render(request, 'search_result.html', {})


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
    return render(request, 'restaurants.html', {"restaurants": restaurants})


def user_profile(request):
    if request.user.is_authenticated:
        return render(request, 'user_profile.html')
    else:
        messages.error(request, "You are not login!")
        return redirect('wongnork:login')



def register_request(request):
    restaurants = Restaurant.objects.all()
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful.")
            return render(request, 'home_page.html', {"restaurants": restaurants})
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
    return redirect("wongnork:home-page")


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


def add(request, restaurant_id):
    if request.user.is_authenticated:
        res = get_object_or_404(Restaurant, pk=restaurant_id)
        return render(request, 'wongnork/add.html', {'restaurant': res})
    else:
        return redirect('wongnork:login')


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

@login_required
def comment_add(request, review_id):
    review = get_object_or_404(Review, pk=review_id)
    if review:
        review.comment_set.create(comment_user=request.user, comment_description=request.POST.get('comment_description'))
    else:
        print("Invalid fields for comment. Required: review id, username and comment description.")

    return render(request, 'review_page.html', {'restaurant': review.restaurant, 'user': request.user})


@login_required
def reply(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    if comment:
        comment.reply_set.create(reply_user=request.user, reply_description=request.POST.get('reply_description'))
    else:
        print("Invalid fields for reply. Required: comment id, username and reply description.")

    return render(request, 'review_page.html', {'restaurant': comment.review.restaurant, 'user': request.user})

