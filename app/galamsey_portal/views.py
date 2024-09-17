
import requests, ast, json
from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from django.shortcuts import render
from django.core.serializers import serialize
import ee
from django.conf import settings
from django.core.mail import send_mail

service_account = settings.SERVICE_ACCOUNT_NAME
private_key = settings.SERVICE_ACCOUNT_KEY
base_dir = settings.BASE_DIR
gee_projects_assets = settings.PROJECT_ASSETS
host_email = settings.EMAIL_HOST_USER
recipient_emails = settings.RECIPIENT_EMAILS
geoserver_url = 'https://geoserver-dev.cersgis.org/geoserver/wfs'

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
    
    toHTML['footprint_years'] = footprint_years

    return render(request, 'portal/index.html', toHTML)

def getPilotRegions(request):
    toHTML = {}

    toHTML['regions'] = PilotFootprintRegion.objects.all().order_by('reg_code')

    return render(request, 'portal/snippets/region.html', toHTML)

def getPilotDistricts(request):
    toHTML = {}
    
    region = request.GET.get('reg_code', None)

    cql_filter = f"reg_code='{region}'"

    response_obj = requests.get(geoserver_url,params={
        'service': 'WFS',
        'version': '2.0.0',
        'request': 'GetFeature',
        'typename': 'galamsey:area_of_interest',
        'CQL_FILTER': cql_filter,
        'sortBy':'district',
        'outputFormat': "application/json",
      }).json()
    
    toHTML['districts'] = response_obj['features']

    return render(request, 'portal/snippets/district.html', toHTML)

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
def analysisView(request):
    toHTML = {}

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
            return 

        cql_filter = ''

        if layer_name == 'galamsey:region':
            cql_filter = f"reg_code='{region}'"
        elif layer_name == 'galamsey:area_of_interest':
            cql_filter = f"district_code='{district}'"
        elif layer_name == 'galamsey:protected_area':
            cql_filter = f"id='{protected_id}'"



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
        toHTML['mapid'] = str(idfeatures['tile_fetcher'].url_format)
        toHTML['token'] = idfeatures['token']
        toHTML['stats'] = [ year, [color], area_stats]
        toHTML['geometry'] = feature_obj
    
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
        elif layer_name == 'galamsey:area_of_interest':
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

        # Return Responses
        toHTML['mapid_left'] = str(idfeatures_1['tile_fetcher'].url_format)
        toHTML['mapid_right'] = str(idfeatures_2['tile_fetcher'].url_format)
        toHTML['token_left'] = idfeatures_1['token']
        toHTML['token_right'] = idfeatures_2['token']
        toHTML['stats'] = [ { 'name': year_1, 'color': color_1,'data': area_stats_1}, {'name': year_2, 'color': color_2 , 'data': area_stats_2}]
        toHTML['geometry'] = feature_obj

    return JsonResponse(toHTML, safe=False)

def dataRequestView(request):
    name = request.POST.get('name', None)
    email = request.POST.get('email', None)
    subject = request.POST.get('subject', None)
    comments = request.POST.get('comments', None)

    print("Request data", name, email, subject, comments)
    
    if request.method == "POST":
        if email == None:
            return JsonResponse({'status': '204', 'message': 'Eamail is required'})
        
        try:
            new_data, created = DataRequest.objects.get_or_create(name=name, email=email, subject=subject, comments=comments)

            if created:
                title = f'Data Request from {name} on Galamsey Portal'
                comment = f'Dear sir/madam, \n\nBelow are the details of the request: \n\nName: {name}\nEmail: {email}. \nSubject: {subject} \nComments:{comments}. \n\nThank You.' 

                try:
                    send_mail(title, comment, host_email, recipient_emails)
                    # send_mail(title, comment, host_email, [email])


                except Exception as e:
                    raise e
                
            return JsonResponse({'status': '200', 'message': ' Request successfully sent'})            

        except Exception as e:
            raise e

# Get Footprints
def loadFootprint(request):
    initGEE()

    toHTML = {}

    year = request.GET.get('year', None)
    footprint_obj = FootprintYear.objects.filter(year=year)
    
    if footprint_obj.exists():
        footprint_img = ee.Image(f'{gee_projects_assets}MINING_FOOTPRINT/{footprint_obj.first().year}_footprint')
        
        style = { 'palette': footprint_obj.first().fill_color }
        
        idfeatures = footprint_img.getMapId(style)
        
        toHTML['mapid'] = str(idfeatures['tile_fetcher'].url_format)
        toHTML['token'] = idfeatures['token']

    return JsonResponse(toHTML, safe= False)


def loadStatistics(request):
    initGEE()
    toHTML = {}

    computed_stats = []

    year = request.GET.get('year', None)
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

        toHTML['computed_stats'] = computed_stats


    return JsonResponse(toHTML, safe=False)


# Get Reference Data
def loadDeforestationData(request):
    initGEE()

    toHTML = {}

    year = request.GET.get('year', None)
    reference_obj = FootprintYear.objects.filter(year=year)
    
    if reference_obj.exists():
        reference_img = ee.Image(f'{gee_projects_assets}WAFORDD_DATA/WAFORDD{reference_obj.first().year}')
        print('reference img', reference_img)
        
        style = { 'palette': reference_obj.first().fill_color }
        
        idfeatures = reference_img.getMapId(style)
        
        toHTML['mapid'] = str(idfeatures['tile_fetcher'].url_format)
        toHTML['token'] = idfeatures['token']

    return JsonResponse(toHTML, safe= False)

def customMapView(request):

    return render(request, 'root_app/components/map.html')

