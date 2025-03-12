from django.urls import path, include
from .views import *
from . import views_api as api_views
from root_app.views import reportsView, mapsView, contactView, articlesView,articleView, singleMapView

app_name = 'galamseyPortal'

########## API V1 URLS ##########
api_urlpatterns = [
    path('footprint', api_views.loadFootprint, name = 'api_load_galamsey_footprint'),

    # Analysis
    path('compute-analysis', api_views.analysisView, name = 'api_compute_analysis'),
    path('compute-stats', api_views.loadStatistics, name = 'api_load_statistics'),

    path('regions', api_views.getPilotRegions, name='api_get_regions'),
    path('districts', api_views.getPilotDistricts, name='api_get_districts'),
    path('protected-area', api_views.getPilotProtectedArea, name='api_get_protected_area'),

    # Additional Layers
    path('lulc-watershed', api_views.loadWaterShed, name='api_load_lulc_watershed'),
]

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
    
    # Planet Reference Data
    path('planet-basemap', loadPlanetData, name='load_planet_basemap'),

    # Additional Layers
    path('lulc-watershed', loadWaterShed, name='load_lulc_watershed'),

    # Reports
    path("reports", reportsView, name="galamsey_reports"),
    path("maps", mapsView, name="galamsey_maps"),
    path("map", singleMapView, name="galamsey_map_details"),
    path("articles", articlesView, name="galamsey_articels"),
    path("article", articleView, name="galamsey_articel"),
    path("contact", contactView, name="galamsey_contact"),

    # Dashboard URLS
    path('load-dashboard-protected-area', loadDashboardProtectedArea, name='load_dashboard_protected_area'),
    path('load-dashboard-districts', loadDashboardDistrictSummary, name='load_dashboard_districts'),

    # API URLS
    path('api/v1/', include(api_urlpatterns)),

]
