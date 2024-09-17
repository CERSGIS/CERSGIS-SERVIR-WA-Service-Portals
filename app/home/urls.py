from django.urls import path
from .views import *

app_name = 'home'

urlpatterns = [
    path('', homeView, name="home_view"),
    path('service', serviceView, name="about_service_view"),
]
