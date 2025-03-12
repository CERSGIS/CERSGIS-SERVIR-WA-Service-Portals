import requests
import ast
from django.shortcuts import render
from django.http import JsonResponse
from djgeojson.views import GeoJSONLayerView
from .models import *
from django.shortcuts import render
import ee
from django.conf import settings
from django.core.mail import send_mail
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from rest_framework.response import Response
from home.models import RecipientEmail
from root_app.models import Report


host_email = settings.EMAIL_HOST_USER
geoserver_url = settings.GEOSERVER_BASE_URL
service_account = settings.SERVICE_ACCOUNT_NAME
private_key = settings.SERVICE_ACCOUNT_KEY
gee_projects_assets = settings.PROJECT_ASSETS

# Initialize GEE 
def initGEE():
    try:
        # Initializing GEE
        ee.Initialize()
    except Exception as e:
        credentials = ee.ServiceAccountCredentials(service_account, private_key)
        ee.Initialize(credentials)

def calculateCharcoalPoints(cql_filter):
  from xml.etree.ElementTree import XML, fromstring

  response_obj = requests.get(geoserver_url, params={
      'service': 'WFS',
      'version': '2.0.0',
      'request': 'GetFeature',
      'typename': 'charcoal:points',
      'CQL_FILTER': cql_filter,
      'resultType': 'hits',
  })
    
  xml_obj = fromstring(response_obj.content)

  return xml_obj.attrib['numberMatched']


@api_view(['GET'])
def generateStatsData(points_data, level):
  stats_data = {}

  if level == 'charcoal:region':
    for points_item in points_data:
      if points_item['properties']['district'] != stats_data:
        total_count = calculateCharcoalPoints(f"district_code='{points_item['properties']['district_code']}' and year='{points_item['properties']['year']}'")
        stats_data.update({str(f"{points_item['properties']['district']}"): int(total_count)})
    
  elif level == 'charcoal:area_of_interest':
    for points_item in points_data:
      if points_item['properties']['community'] != stats_data:
        total_count = calculateCharcoalPoints(f"community='{points_item['properties']['community']}' and year='{points_item['properties']['year']}'")
        stats_data.update({f"{points_item['properties']['community']}": int(total_count)})

  result = [[district, count_value] for district, count_value in stats_data.items()]

  return result

def mapView(request):
  toHTML = {}

  charcoalData = CharcoalPointYear.objects.all().order_by('year')
  toHTML['app_details'] = AppDetails.objects.all().last()
  toHTML['partners'] = Partner.objects.all().order_by('id')
  toHTML['charcoalpoint_years'] = charcoalData
  toHTML['reports'] = Report.objects.filter(service='CHARCOAL').order_by('id')

  return render(request, 'charcoal_portal/index.html', toHTML)


@swagger_auto_schema(
    method='get',
    operation_description="Get all pilot regions",
    responses={
        200: openapi.Response(
            description="Successful response",
        ),
        400: openapi.Response(description="Bad request")
    }
)
@api_view(['GET'])
def getCharcoalRegions(request):

  regions = CharcoalRegion.objects.all().order_by('-id')

  serialized_regions = charcoalRegionsSerializer(regions, many = True)

  return Response(serialized_regions.data, status = status.HTTP_200_OK)


@swagger_auto_schema(
    method='get',
    operation_description="Get all pilot districts",
     manual_parameters=[
        openapi.Parameter('reg_code', openapi.IN_QUERY, description="Region code is required", type=openapi.TYPE_STRING),
    ],
    responses={
        200: openapi.Response(
            description="Successful response",
        ),
        400: openapi.Response(description="Bad request")
    }
)
@api_view(['GET'])
def getCharcoalDistricts(request):
  toHTML = {}

  region = request.GET.get('reg_code', None)
  
  cql_filter = f"reg_code='{region}'"

  response_obj = requests.get(geoserver_url, params= {
    'service': 'WFS',
    'version': '2.0.0',
    'request': 'GetFeature',
    'typename': 'charcoal:area_of_interest',
    'CQL_FILTER': cql_filter,
    'sortBy':'district',
    'outputFormat': "application/json",
  }).json()

  toHTML['districts'] = response_obj['features']
   
  # return render(request, 'charcoal_portal/snippets/district.html', toHTML)
  return JsonResponse(toHTML, safe=False)


""" 
  Analysis Computations
"""
@api_view(['GET'])
def analysisView(request):
  toHTML = {}

  compare = request.GET.get('compare', None)

  if not compare == 'compare':
    #  Request Values
    year = request.GET.get('year', None)
    layer_name = request.GET.get('layer_name', None)
    points_layer_name = 'charcoal:points'
    region = request.GET.get('region', None)
    district = request.GET.get('district', None)

    # Check if year is valid
    charcoalpoint_obj = CharcoalPointYear.objects.filter(year=year)

    if not charcoalpoint_obj.exists():
      return
    
    cql_filter = ''
    points_cql_filter = ''
    stats_name = ''

    # Modify filter based on layer_name
    if layer_name == 'charcoal:region':
      cql_filter = f"reg_code='{region}'"
      points_cql_filter = f"reg_code='{region}' and year='{year}'"
      stats_name = 'Districts'
    elif layer_name == 'charcoal:area_of_interest':
      cql_filter = f"district_code='{district}'"
      points_cql_filter = f"district_code='{district}' and year='{year}'"
      stats_name = 'Communities'




    # Get geometry
    response_obj = requests.get(geoserver_url, params={
      'service': 'WFS',
      'version': '2.0.0',
      'request': 'GetFeature',
      'typename': layer_name,
      'CQL_FILTER': cql_filter,
      'outputFormat': "application/json",
    }).json()

    feature_obj = response_obj['features'][0]

    # GET Points
    points_response_obj = requests.get(geoserver_url, params={
      'service': 'WFS',
      'version': '2.0.0',
      'request': 'GetFeature',
      'typename': points_layer_name,
      'CQL_FILTER': points_cql_filter,
      'outputFormat': "application/json",
    }).json()

    points_obj = points_response_obj['features']

    computed_stats = generateStatsData(points_obj, layer_name)

    color = charcoalpoint_obj.first().fill_color

    points_style = {
      'radius': 6,
      'fillColor': charcoalpoint_obj.first().fill_color,
      'color': charcoalpoint_obj.first().border_color,
      'weight': 1,
      'opacity': 1,
      'fillOpacity': 0.8,
    }

    # Return Response
    toHTML['points'] = points_obj
    toHTML['points_style'] = points_style
    toHTML['geometry'] = feature_obj
    toHTML['stats'] = [ stats_name, [color], computed_stats]

  return JsonResponse(toHTML, safe=False)



@api_view(['GET'])
def loadStatistics(request):
  toHTML = {}

  calculated_points_list = []
  year_categories_list = []

  charcoal_points_obj = CharcoalPointYear.objects.all().order_by('year')

  if charcoal_points_obj.exists():
    for year_obj in charcoal_points_obj:
      year = year_obj.year
      point_value = calculateCharcoalPoints(f'year={year}')

      year_categories_list.append(year)
      calculated_points_list.append(int(point_value))

    computed_stats = {
      'categories': year_categories_list, 
      'series': [{'name': 'Charcoal Points', 'data': calculated_points_list}]
      }

    toHTML['computed_stats'] = computed_stats
  return JsonResponse(toHTML, safe = False)

def dataRequestView(request):
    name = request.POST.get('name', None)
    email = request.POST.get('email', None)
    subject = request.POST.get('subject', None)
    comments = request.POST.get('comments', None)
    
    if request.method == "POST":
        if email == None:
            return JsonResponse({'status': '204', 'message': 'Eamail is required'})
        
        try:
            new_data, created = DataRequest.objects.get_or_create(name=name, email=email, subject=subject, comments=comments)

            if created:
                title = f'Data Request from {name} on Charcoal Portal'
                comment = f'Dear sir/madam, \n\nBelow are the details of the request: \n\nName: {name}\nEmail: {email}. \nSubject: {subject} \nComments:{comments}. \n\nThank You.' 

                try:
                    recipient_emails = list(RecipientEmail.objects.filter(receive_charcoal_email=True).values_list("email", flat=True))

                    if recipient_emails: 
                        send_mail(title, comment, host_email, recipient_emails)

                except Exception as e:
                    raise e
                
            return JsonResponse({'status': '200', 'message': ' Request successfully sent'})            

        except Exception as e:
            raise e


# Water Shed
@swagger_auto_schema(
    method='get',
   
    responses={
        200: openapi.Response(
            description="Successful response",
            examples={
                'application/json': {
                    "message": "Data retrieved successfully",
                    "data": {}
                }
            }
        ),
        400: openapi.Response(description="Bad request")
    }
)

@api_view(['GET'])
# Water Shed
def loadWaterShed(request):
    initGEE()
    toHTML = {}

    # year = request.GET.get('year', None)

    water_shed = ee.Image(f'{gee_projects_assets}LU_LC/LandCover_Savannah')
    classification_colors = [
              '#0070FF', # water 1
              '#FFFF00', # Agriculture 2
              '#4FBB36', # Savanna Woodland/Woodland 3
              '#4FBB36', # Savanna Woodland/Woodland 4
              '#D7C29E', # Shrub and Trees 5
              '#4FBB36', # Riparian Forest 6
              '#FFAA00', # Grassland 7
              '#008000', # Closed Forest 8
              '#B514FF', # Plantation 9
              '#9EFBAA', # Open Forest 10
              '#FFFFFF00', # Transparent  11
              '#FFFFFF00', # Transparent 12
              '#FF0000', # Built Up 13
    ]

    visualized_shed = water_shed.visualize(min = 1, max = 13, palette = classification_colors)

    idfeatures = visualized_shed.getMapId()

    gee_mapid = str(idfeatures['tile_fetcher'].url_format)
    gee_token = idfeatures['token']

    # Get water shed data from geoserver
    response_obj = requests.get(geoserver_url,params={
        'service': 'WFS',
        'version': '2.0.0',
        'request': 'GetFeature',
        'typename': 'charcoal:watershed_savannah',
        # 'CQL_FILTER': cql_filter,
        # 'sortBy':'district',
        'outputFormat': "application/json",
      }).json()

    # Return JSON Response with Both Datasets
    response_data = {
        "land_use_land_cover_image": {
            "mapid": gee_mapid,
            "token": gee_token
        },
        "watershed_boundary": response_obj
    }

    return JsonResponse(response_data, safe=False)