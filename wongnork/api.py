import requests
from requests.api import get
from .models import Restaurant

url = "https://travel-advisor.p.rapidapi.com/restaurants/list"

querystring = {"location_id": "293919", "restaurant_tagcategory": "10591", "restaurant_tagcategory_standalone": "10591",
               "currency": "USD", "lunit": "km", "limit": "30", "open_now": "false", "lang": "en_US"}

headers = {
    'x-rapidapi-host': "travel-advisor.p.rapidapi.com",
    'x-rapidapi-key': "224232e727msh54aa7dcbdad4f69p1526cfjsn65b5e9f4a8e0"
}


# class Restaurant():
#     def __init__(self, name, location_string, photo, description, rating, num_reviews):
#         self.name = name
#         self.location_string = location_string
#         self.photo = photo
#         self.description = description
#         self.rating = rating
#         self.num_reviews = num_reviews


def get_restaurant_data():
    data = []
    response = requests.request("GET", url, headers=headers, params=querystring).json()
    restaurants = response["data"]
    for i in restaurants:
        if "name" in i.keys():
            data = Restaurant.objects.create(restaurant_name=i['name'],
                                      location=i['location_string'],
                                      photo=i['photo']['images']['original']['url'],
                                      detail=i['description'])
    return data