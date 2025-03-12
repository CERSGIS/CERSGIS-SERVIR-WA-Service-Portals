
import requests, ast, json
from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from django.shortcuts import render
from django.core.serializers import serialize
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


service_account = settings.SERVICE_ACCOUNT_NAME
private_key = settings.SERVICE_ACCOUNT_KEY
base_dir = settings.BASE_DIR
gee_projects_assets = settings.PROJECT_ASSETS
host_email = settings.EMAIL_HOST_USER
geoserver_url = settings.GEOSERVER_BASE_URL
cache_timeout = int(settings.CACHE_TIMEOUT)

# Styles used for Compare
style1 = { 'palette': '#fcfa00' }
style2 = { 'palette': '#ec0cdf' }

# Initialize GEE 
def initGEE():
    try:
        # Initializing GEE
        ee.Initialize()
    except Exception as e:
        credentials = ee.ServiceAccountCredentials(service_account, private_key)
        ee.Initialize(credentials)

def map_function(item):
    areaDict = ee.Dictionary(item)
    classNumber = ee.Number(areaDict.get('class')).format()
    area = ee.Number(areaDict.get('sum')).divide(1e6).format('%.3f')
    return ee.List([classNumber, ee.Number.parse(area)])
  
def rename_stats(stats):
    for ss in stats:
        if ss[0] == '1':
            ss[0] = 'Active Site'
        elif ss[0] == '2':
            ss[0] = 'Inactive Site'
        elif ss[0] == '3':
            ss[0] = 'Polluted River'
    
    return stats

def calculateFootprintArea(geeImage, aoi, band):
    initGEE()
    
    if band == 'all':
       img_remap = geeImage.remap([1,2,3],[1,1,1])
       area_image = img_remap.multiply(ee.Image.pixelArea())

       area = area_image.reduceRegion(
        reducer= ee.Reducer.sum(),
        geometry = aoi,
        scale=4.77,
        maxPixels=1e12
        )
       
       area_sqkm = ee.Number(area.get('remapped')).divide(1e6).format('%.3f').getInfo()
    else:
        area_image = ee.Image.pixelArea().addBands(geeImage)

        area = area_image.reduceRegion(
            reducer= ee.Reducer.sum().group(
            groupField= 1,
            groupName= 'class',
        ),
        geometry= aoi,
        scale= 4.77,
        maxPixels= 1e12
        ); 
    
        classAreas = ee.List(area.get('groups'))
 
        classAreaLists = classAreas.map(map_function)
 
        area_sqkm = classAreaLists.getInfo()
 
    return area_sqkm

def convertGeometry(geometry):
    initGEE()

    return ee.Feature(geometry).geometry()

def mapView(request):
    toHTML = {}

    toHTML['app_details'] = AppDetails.objects.all().last()
    toHTML['partners'] = Partner.objects.all().order_by('id')
    toHTML['reports'] = Report.objects.all().order_by('id')
    toHTML['layers'] = ['district_layer', 'region_layer', 'protected_area', 'mineral_concession']

    footprint_years = FootprintYear.objects.all().order_by('year')
    
    res = {'footprint_years': footprint_years}

    return JsonResponse(res, status=status.HTTP_200_OK)


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
def getPilotRegions(request):
    regions = PilotFootprintRegion.objects.all().order_by('reg_code')

    serialized_regions = footprintRegionSerializer(regions, many = True)

    return Response(serialized_regions.data, status = status.HTTP_200_OK)



@swagger_auto_schema(
    method='get',
    operation_description="Get all pilot districts",
    manual_parameters=[
        openapi.Parameter('reg_code', openapi.IN_QUERY, description="Region (required)", type=openapi.TYPE_STRING),
    ],
    responses={
        200: openapi.Response(
            description="Successful response",
        ),
        400: openapi.Response(description="Bad request")
    }
)
@api_view(['GET'])
def getPilotDistricts(request):    
    region = request.GET.get('reg_code', None)

    if not region:
        return  Response({"message": f"reg_code is required"}, status=status.HTTP_400_BAD_REQUEST)

    cql_filter = f"reg_code='{region}'"

    response_obj = requests.get(geoserver_url,params={
        'service': 'WFS',
        'version': '2.0.0',
        'request': 'GetFeature',
        'typename': 'galamsey:aoi_districts',
        'CQL_FILTER': cql_filter,
        'sortBy':'district',
        'outputFormat': "application/json",
      }).json()
    
    res = {'districts': response_obj['features']}

    return Response(res, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='get',
    operation_description="Get pilot protected areas",
    responses={
        200: openapi.Response(
            description="Successful response",
        ),
        400: openapi.Response(description="Bad request")
    }
)
@api_view(['GET'])
def getPilotProtectedArea(request):
    toHTML = {}
    
    region = request.GET.get('reg_code', None)

    cql_filter = f"reg_code='{region}'"

    response_obj = requests.get(geoserver_url,params={
        'service': 'WFS',
        'version': '2.0.0',
        'request': 'GetFeature',
        'typename': 'galamsey:protected_area',
        'CQL_FILTER': cql_filter,
        'sortBy':'reserve_na',
        'outputFormat': "application/json",
      }).json()
    
    toHTML['protected_areas'] = response_obj['features']

    return render(request, 'portal/snippets/protected-area.html', toHTML)

""" 
    Analysis Computations
    - 
"""

@swagger_auto_schema(
    method='get',
    operation_description="Compare Galamsey footprints. "
                            "If `compare` is not provided, `year` is required. "
                            "If `compare` is provided, `year1` and `year2` are required.",
    manual_parameters=[
        openapi.Parameter('year', openapi.IN_QUERY, description="Year (required if compare is not provided)", type=openapi.TYPE_INTEGER),
        openapi.Parameter('year1', openapi.IN_QUERY, description="Year1 (required if compare is provided)", type=openapi.TYPE_INTEGER),
        openapi.Parameter('year2', openapi.IN_QUERY, description="Year2 (required if compare is provided)", type=openapi.TYPE_INTEGER),
        openapi.Parameter('compare', openapi.IN_QUERY, description="Compare flag", type=openapi.TYPE_STRING),
        openapi.Parameter('region', openapi.IN_QUERY, description="Region", type=openapi.TYPE_STRING),
        openapi.Parameter('district', openapi.IN_QUERY, description="District", type=openapi.TYPE_STRING),
        openapi.Parameter('layer_name', openapi.IN_QUERY, description="Layer (required)", type=openapi.TYPE_STRING),
    ],
    responses={
        200: openapi.Response(
            description="Successful response",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'mapid': openapi.Schema(type=openapi.TYPE_STRING, description='A string URL field'),
                    'token': openapi.Schema(type=openapi.TYPE_STRING, description='An string field'),
                    'stats': openapi.Schema(type=openapi.TYPE_STRING, description=f"['2017',['#FF0000'],[['Active Site',0.475],['Polluted River',0.011]]]"),
                    'geometry': openapi.Schema(type=openapi.TYPE_OBJECT,
                        properties={
                            'type': openapi.Schema(
                                type=openapi.TYPE_STRING,
                                description='Type of the feature',
                                example='Feature'
                            ),
                            'id': openapi.Schema(
                                type=openapi.TYPE_STRING,
                                description='ID of the feature',
                                example='region.AR'
                            ),
                            'geometry': openapi.Schema(
                                type=openapi.TYPE_OBJECT,
                                description='Geometry details',
                                properties={
                                    'type': openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description='Type of geometry',
                                        example='MultiPolygon'
                                    ),
                                    'coordinates': openapi.Schema(
                                        type=openapi.TYPE_ARRAY,
                                        items=openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_NUMBER)),
                                        description='Coordinates of the geometry'
                                    )
                                }
                            ),
                            'geometry_name': openapi.Schema(
                                type=openapi.TYPE_STRING,
                                description='Name of the geometry',
                                example='geom'
                            ),
                            'properties': openapi.Schema(
                                type=openapi.TYPE_OBJECT,
                                description='Additional properties',
                                properties={
                                    'reg_code': openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description='A sample property',
                                        example='value1'
                                    ),
                                    'id': openapi.Schema(
                                        type=openapi.TYPE_NUMBER,
                                        description='id',
                                        example=123
                                    ),
                                    'region': openapi.Schema(
                                        type=openapi.TYPE_STRING,
                                        description='Region',
                                        example='AHAFO'
                                    ),
                                }
                            )
                        }

                      )

                }
            )
        ),
        400: openapi.Response(
            description="Bad request",
        )
    }
)
@api_view(['GET'])
def analysisView(request):

    compare = request.GET.get('compare', None)

    if not compare == 'compare':
        # Request Values
        region = request.GET.get('region', None)
        district = request.GET.get('district', None)
        protected_id = request.GET.get('protected_id', None)
        year = request.GET.get('year', None)
        layer_name = request.GET.get('layer_name', None)

        # Check if Year is Valid
        footprint_obj = FootprintYear.objects.filter(year=year)
        
        if not footprint_obj.exists():
            return  Response({"message": f"Statistics for year '{year}' is not available"}, status=status.HTTP_400_BAD_REQUEST)

        cql_filter = ''

        if layer_name == 'galamsey:region':
            cql_filter = f"reg_code='{region}'"
        elif layer_name == 'galamsey:aoi_districts':
            cql_filter = f"district_code='{district}'"
        elif layer_name == 'galamsey:protected_area':
            cql_filter = f"id='{protected_id}'"
        else:
            return  Response({"message": "layer_name is required"}, status=status.HTTP_400_BAD_REQUEST)



        # Get Geometry
        response_obj = requests.get(geoserver_url,params={
            'service': 'WFS',
            'version': '2.0.0',
            'request': 'GetFeature',
            'typename': layer_name,
            'CQL_FILTER': cql_filter,
            'outputFormat': "application/json",
        }).json()

        feature_obj = response_obj['features'][0]

        # convert Geometry
        geom_obj = convertGeometry(feature_obj)
        

        # Get Footprint Image(s)
        footprint_img = ee.Image(f'{gee_projects_assets}MINING_FOOTPRINT/{footprint_obj.first().year}_footprint')
        
        color = footprint_obj.first().fill_color

        style = { 'palette': color }
            
        # Clip Image(s)
        footprint_img_clipped = footprint_img.clip(geom_obj)

        # Calculate Area
        area_stats = calculateFootprintArea(footprint_img_clipped, geom_obj, 'single')

        for ss in area_stats:
            if ss[0] == '1':
                ss[0] = 'Active Site'
            elif ss[0] == '2':
                ss[0] = 'Inactive Site'
            elif ss[0] == '3':
                ss[0] = 'Polluted River'

        idfeatures = footprint_img_clipped.getMapId(style)
        

        # Return Responses
        res = {
        'mapid': str(idfeatures['tile_fetcher'].url_format),
        'token': idfeatures['token'],
        'stats': [ year, [color], area_stats],
        'geometry': feature_obj,
        }

    elif compare == 'compare':
        region = request.GET.get('region', None)
        district = request.GET.get('district', None)
        protected_id = request.GET.get('protected_id', None)
        year_1 = request.GET.get('year1', None)
        year_2 = request.GET.get('year2', None)
        layer_name = request.GET.get('layer_name', None)

        footprint_obj_1 = FootprintYear.objects.filter(year=year_1)
        footprint_obj_2 = FootprintYear.objects.filter(year=year_2)

        if not footprint_obj_1.exists() or not footprint_obj_2.exists():
            return

        cql_filter = ''

        if layer_name == 'galamsey:region':
            cql_filter = f"reg_code='{region}'"
        elif layer_name == 'galamsey:aoi_districts':
            cql_filter = f"district_code='{district}'"
        elif layer_name == 'galamsey:protected_area':
            cql_filter = f"id='{protected_id}'"

        response_obj = requests.get(geoserver_url,params={
            'service': 'WFS',
            'version': '2.0.0',
            'request': 'GetFeature',
            'typename': layer_name,
            'CQL_FILTER': cql_filter,
            'outputFormat': "application/json",
        }).json()

        feature_obj = response_obj['features'][0]

        # convert Geometry
        geom_obj = convertGeometry(feature_obj)

        # Get Footprint Image(s)
        footprint_img_1 = ee.Image(f'{gee_projects_assets}MINING_FOOTPRINT/{footprint_obj_1.first().year}_footprint')
        footprint_img_2 = ee.Image(f'{gee_projects_assets}MINING_FOOTPRINT/{footprint_obj_2.first().year}_footprint')

        color_1 = footprint_obj_1.first().fill_color
        color_2 = footprint_obj_2.first().fill_color

        style_1 = { 'palette': color_1 }
        style_2 = { 'palette': color_2 }

        # Clip Image(s)
        footprint_img_clipped_1 = footprint_img_1.clip(geom_obj)
        footprint_img_clipped_2 = footprint_img_2.clip(geom_obj)

        # Calculate Area
        area_stats_1 = calculateFootprintArea(footprint_img_clipped_1, geom_obj, 'single')
        area_stats_2 = calculateFootprintArea(footprint_img_clipped_2, geom_obj, 'single')

        area_stats_1 = rename_stats(area_stats_1)
        area_stats_2 = rename_stats(area_stats_2)
         
        idfeatures_1 = footprint_img_clipped_1.getMapId(style_1)
        idfeatures_2 = footprint_img_clipped_2.getMapId(style_2)

        res = {
            'mapid_left': str(idfeatures_1['tile_fetcher'].url_format),
            'mapid_right': str(idfeatures_2['tile_fetcher'].url_format),
            'token_left': idfeatures_1['token'],
            'token_right': idfeatures_2['token'],
            'stats': [ { 'name': year_1, 'color': color_1,'data': area_stats_1}, {'name': year_2, 'color': color_2 , 'data': area_stats_2}],
            'geometry': feature_obj,
        }

    return Response(res, status=status.HTTP_200_OK)


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
                title = f'Data Request from {name} on Galamsey Portal'
                comment = f'Dear sir/madam, \n\nBelow are the details of the request: \n\nName: {name}\nEmail: {email}. \nSubject: {subject} \nComments:{comments}. \n\nThank You.' 

                try:
                    recipient_emails = list(RecipientEmail.objects.filter(receive_galamsey_email=True).values_list("email", flat=True))

                    if recipient_emails: 
                        send_mail(title, comment, host_email, recipient_emails)


                except Exception as e:
                    raise e
                
            return JsonResponse({'status': '200', 'message': ' Request successfully sent'})            

        except Exception as e:
            raise e

# Get Footprints
@swagger_auto_schema(
    method='get',
    operation_description="Retrieve footprint data with query parameter."
                            "`year` is required.",
    manual_parameters=[
        openapi.Parameter('year', openapi.IN_QUERY, description="Year (required)", type=openapi.TYPE_INTEGER),
    ],
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
# Get Footprints
def loadFootprint(request):
    initGEE()

    year = request.GET.get('year', None)
    footprint_obj = FootprintYear.objects.filter(year=year)

    if not footprint_obj.exists():
        return  Response({"message": f"Footprint for year '{year}' is not available"}, status=status.HTTP_400_BAD_REQUEST)

    if footprint_obj.exists():
        footprint_img = ee.Image(f'{gee_projects_assets}MINING_FOOTPRINT/{footprint_obj.first().year}_footprint')
        
        style = { 'palette': footprint_obj.first().fill_color }
        
        idfeatures = footprint_img.getMapId(style)
        
        res = {
            'mapid': str(idfeatures['tile_fetcher'].url_format),
            'token': idfeatures['token'],
        }

    return Response(res, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='get',
    operation_description="Retrieve data with conditional query parameters. "
                            "If `compare` is not provided, `year` is required. "
                            "If `compare` is provided, `year1` and `year2` are required.",
    manual_parameters=[
        openapi.Parameter('year', openapi.IN_QUERY, description="Year (required if compare is not provided)", type=openapi.TYPE_INTEGER),
    ],
    responses={
        200: openapi.Response(
            description="Successful response",
              schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
     
                }
            )
        ),
        400: openapi.Response(description="Bad request")
    }
)
@api_view(['GET'])
def loadStatistics(request):
    initGEE()
    computed_stats = []

    year = request.GET.get('year', None)

    if not year:
        return  Response({"message": f"Year is required"}, status=status.HTTP_400_BAD_REQUEST)

    aoi = ee.FeatureCollection(f'{gee_projects_assets}pilot_area')

    if year == 'all':
        footprint_obj = FootprintYear.objects.all().order_by('year')
    else:
        footprint_obj = FootprintYear.objects.filter(year=year)

    if footprint_obj.exists():

        for year_obj in footprint_obj:
            year = year_obj.year
            footprint_img = ee.Image(f'{gee_projects_assets}MINING_FOOTPRINT/{year}_footprint')
            computed_area = calculateFootprintArea(footprint_img, aoi, 'all')

            data = [year, float(computed_area)]

            computed_stats.append(data)

        res = {'computed_stats': computed_stats}

    return Response(res, status=status.HTTP_200_OK)


# Get Reference Data
def loadDeforestationData(request):
    initGEE()

    toHTML = {}

    year = request.GET.get('year', None)
    reference_obj = FootprintYear.objects.filter(year=year)
    
    if reference_obj.exists():
        reference_img = ee.Image(f'{gee_projects_assets}WAFORDD_DATA/WAFORDD{reference_obj.first().year}')
        
        style = { 'palette': reference_obj.first().fill_color }
        
        idfeatures = reference_img.getMapId(style)
        
        toHTML['mapid'] = str(idfeatures['tile_fetcher'].url_format)
        toHTML['token'] = idfeatures['token']

    return JsonResponse(toHTML, safe= False)



# Water Shed
@swagger_auto_schema(
    method='get',
    operation_description="Retrieve watershed data with query parameter."
                            "`year` is required.",
    manual_parameters=[
        openapi.Parameter('year', openapi.IN_QUERY, description="Year (required)", type=openapi.TYPE_INTEGER),
    ],
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

    year = request.GET.get('year', None)

    water_shed = ee.Image(f'{gee_projects_assets}LU_LC/Southern_{year}')
    classification_colors = ['#02dcff', # water 2
              '#6749a7', # mangrove/wetlands 3
              '#aa90d3', # wetlands 4
              'black', # mining 5
              'red',# Artificial Surfaces 6
              'darkgreen', # Closed Forest 7
              '#5dbb00', # Open Forest 8
              '#e4a14f', # Woody Crops 9 
              '#f7fb15', # Agriculture 10
              '#9efbaa', # Grassland 11
              'tan', # Shrub 12
              '#0a11fb', # Rubber 13
              '#fba017'  #//Palm 14
            ]
    
    visualized_shed = water_shed.visualize(min = 2, max = 14, palette = classification_colors)

    idfeatures = visualized_shed.getMapId()

    gee_mapid = str(idfeatures['tile_fetcher'].url_format)
    gee_token = idfeatures['token']

    # Get water shed data from geoserver
    response_obj = requests.get(geoserver_url,params={
        'service': 'WFS',
        'version': '2.0.0',
        'request': 'GetFeature',
        'typename': 'galamsey:watershed_southern',
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
