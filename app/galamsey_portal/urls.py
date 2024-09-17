from django.urls import path, include
from .views import *

app_name = 'galamseyPortal'

urlpatterns = [
    path("", mapView, name="galamsey_map_view"),
    path("custom-map", customMapView, name="galamsey_map"),
    path("data-request", dataRequestView, name="data_request"),
    path('footprint', loadFootprint, name='load_galamsey_footprint'),

    # Analysis 
    path('compute-analysis', analysisView, name='compute_analysis'),
    path('compute-stats', loadStatistics, name='load_statistics'),

    path('regions', getPilotRegions, name='get_regions'),
    path('districts', getPilotDistricts, name='get_districts'),
    path('protected-area', getPilotProtectedArea, name='get_protected_area'),

    # Reference Data
    path('deforestation-monitor', loadDeforestationData, name='load_deforestation_data'),
]
