from django.urls import path, include
from .views import *
from . import views_api as api_views


app_name = 'charcoalPortal'

########## API V1 URLS ##########
api_urlpatterns = [
    # Analysis
    path('compute-analysis', api_views.analysisView, name = 'api_compute_analysis'),
    path('compute-stats', api_views.loadStatistics, name = 'api_load_statistics'),

    path('regions', api_views.getCharcoalRegions, name='api_get_regions'),
    path('districts', api_views.getCharcoalDistricts, name='api_get_districts'),

    # Watershed
    path('load-watershed', api_views.loadWaterShed, name='api_load_watershed'),
]

urlpatterns = [
    path('', mapView, name="charcoal_map_view"),
    path("data-request", dataRequestView, name="data_request"),

    # Analysis
    path('compute-analysis', analysisView, name='compute_analysis'),
    path('compute-stats', loadStatistics, name='load_statistics'),

    path('regions', getCharcoalRegions, name='get_regions'),
    path('districts', getCharcoalDistricts, name='get_districts'),

    # Additional Layers
    path('lulc-watershed', loadWaterShed, name='load_lulc_watershed'),
    
    #Dashboard URLS
    path('load-dashboard-districts', loadDashboardDistrictSummary, name='load_dashboard_districts'),


    # API URLS
    path('api/v1/', include(api_urlpatterns)),

]
