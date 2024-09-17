from django.urls import path, include
from .views import *

app_name = 'charcoalPortal'

urlpatterns = [
    path('', mapView, name="charcoal_map_view"),
    path("data-request", dataRequestView, name="data_request"),

    path('compute-stats', loadStatistics, name='load_statistics'),
]
