from django.shortcuts import render, redirect, get_object_or_404
from .forms import NewUserForm, ReviewForm
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required

from .api import get_restaurant_data


# Create your views here.
from .models import Restaurant


def profile(request):
    return render(request, 'user_profile.html')


def index(request):
    """Views for home page"""
    restaurants = get_restaurant_data()
    return render(request, 'home_page.html', {"restaurants": restaurants})


def review(request):
    """Views for review page"""
    restaurants = get_restaurant_data()
    return render(request, 'review_page.html', {"restaurants": restaurants})


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
    form = ReviewForm(request.POST)
    if form.is_valid():
        rtg = request.POST.get("rate", 1)
        p = request.POST.get("price", 1)
        res = get_object_or_404(Restaurant, pk=restaurant_id)
        res.review_set.create(review_user=request.user, **form.cleaned_data, review_rate=rtg, review_price=p)
    else:
        print(form.errors)

    # return render(request, 'reviewapp/details.html', {'restaurant': res, 'user': request.user})
