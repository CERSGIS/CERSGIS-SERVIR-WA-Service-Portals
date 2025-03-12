from django.urls import path, include
from .views.charcoal_views import *
from .views.galamsey_views import *

app_name = 'oldCodes'

urlpatterns = [
# =============================================================================
#                                   CHARCOAL URLS
# =============================================================================
    # path('', mapView, name="charcoal_map_view"),
    
    # path('load-points', loadingPoints, name='load_points'),

    # path('region', regionView.as_view(), name='region'),
    # path('load-aoi', loadAoi.as_view(), name='loadaoi'),


# =============================================================================
#                                   GALAMSEY URLS
# =============================================================================
    # path("login", indexView, name="rootView"),

    # path("map", mapView, name="mapView"),

    # path("catalog", catalogView, name="rootView"),

    # path('loadaoi', loadAoi.as_view(), name='loadaoi'),

    # path('footprint', loadFootprint, name='footprint'),

    # path('protected-area-footprint', footprintByProtectedAreas, name='footprint_by_protected_area'),

    # path('get-districts', getDistricts, name='get_districts'),

    # path('get-protected-area', getProtectedArea, name='get_protected_area'),

    # path('csv-upload', csv_uploader, name='upload_csv'),

    # path('region', RegionView.as_view(), name='region'),

    # path('district', DistrictView.as_view(), name='district'),

    # path('protected-area', ProtectedAreaView.as_view(), name='protected_area'),

    # path('mineral-concession', MineralConcessionView.as_view(), name='mineral_concession'),

    # path('loadfootprint', loadingFootprint, name='loadfootprint'),

    # path("maproute/", maprouteView, name="rootView"),

    # path("querydata/", querydataView, name="rootView"),

    # path("mapdetails/", mapdetailsView, name="rootView"),

    # # path("territory/", territoryView, name="rootView"),

    # path("territory/", territoryView.as_view(), name="rootView")




]
