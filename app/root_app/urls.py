from django.urls import path, include
from .views import *

app_name = 'rootApp'

urlpatterns = [

    path('region', RegionView.as_view(), name='region'),
    
    # path('get-districts', getDistricts, name='get_districts'),

    # path('district', DistrictView.as_view(), name='district'),

]
