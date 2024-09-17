from django.urls import path, include

from .views import *
from . import views_api as api_views

app_name = 'landscapeGH'

########## API V1 URLS ##########
api_urlpatterns = [
  path('', api_views.apiHomeView, name = 'api_home'),
  path('data-submissions', api_views.apiDataSubmissions, name = 'api_data_submissions'),
]

########## URLS ##########
urlpatterns = [
  path('', indexView, name='index'), 
  path('map', mapView, name='map'), 
  path('api/v1/', include(api_urlpatterns)),
]
