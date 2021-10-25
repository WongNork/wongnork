from django.http import HttpResponse
from django.shortcuts import render


def profile(request):
    return render(request, 'user_profile.html')

def index(request):
    """Views for home page"""
    return render(request, 'home_page.html')
