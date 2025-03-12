
import ast
from django.shortcuts import render
from django.http import JsonResponse
from djgeojson.views import GeoJSONLayerView
from .models import *
from django.shortcuts import render
from django.contrib.gis.db.models.functions import Area

import ee
from django.conf import settings

service_account = settings.SERVICE_ACCOUNT_NAME
private_key = settings.SERVICE_ACCOUNT_KEY
gee_asset = 'users/Marveh/GALAMSEY/'
gee_projects_assets = 'projects/ee-cersgisrsteams/assets/'

# Styles used for Compare
style1 = { 'palette': '#fcfa00' }
style2 = { 'palette': '#ec0cdf' }


def indexView(request):
    toHTML = {}

    return render(request, 'portal/login.html', toHTML)


def mapView(request):
    toHTML = {}
    
    toHTML['app_details'] = AppDetails.objects.all().last()
    toHTML['partners'] = Partner.objects.all().order_by('id')
    toHTML['reports'] = Report.objects.all().order_by('id')
    # toHTML['regions'] = Region.objects.all().order_by('region')
    # toHTML['years'] = Footprints.objects.all().distinct('year').values()
    # toHTML['years_list'] = list(Footprints.objects.all().distinct('year').values())
    return render(request, 'portal/index.html', toHTML)


def catalogView(request):
    toHTML = {}

    return render(request, 'portal/catalog.html', toHTML)


def initGEE():
  try:
     # Initializing GEE
     ee.Initialize()
  except Exception as e:
    credentials = ee.ServiceAccountCredentials(service_account, private_key)
    ee.Initialize(credentials)


# class RegionView(GeoJSONLayerView):
#   model = Region
#   precision = 4
#   simplify = 0.001
#   properties = ('region', 'reg_code')

# class DistrictView(GeoJSONLayerView):
#   model = District
#   precision = 4
#   simplify = 0.001
#   properties = ('district', 'district_code')

# class ProtectedAreaView(GeoJSONLayerView):
#   model = ProtectedArea
#   precision = 4
#   simplify = 0.001
#   properties = ('reserve_na',"area_sqkm")

# class MineralConcessionView(GeoJSONLayerView):
#   model = MineralConcession
#   precision = 4
#   simplify = 0.001
#   properties = ('company_na')

# # LOAD AREA OF INTEREST
# class loadAoi(GeoJSONLayerView):
#   model = AreaOfInterest
#   precision = 4
#   simplify = 0.001
#   properties = ('areasq_km', 'areaha')

# # def loadAoi(request):
# #   initGEE()
# #   toHTML = {}
  
# #   galamsey_aoi = ee.FeatureCollection(f'{gee_asset}Gala_districts')
# #   # galamsey_aoi = ee.FeatureCollection(f'{gee_asset}Pilot_area')
  
# #   style = {'color': '#00000087', 'fillColor': 'transparent', 'weight':'0.3', 'fillOpacity': 0.00}

# #   idfeatures = galamsey_aoi.getMapId(style)

# #   toHTML['mapid'] = str(idfeatures['tile_fetcher'].url_format)
# #   toHTML['token'] = idfeatures['token']

# #   return JsonResponse(toHTML, safe=False)


# # CSV UPLOADER VIEW
# def csv_uploader(request):
#   toHTML = {}

#   return render(request, 'portal/csv_uploader.html', toHTML)

# def getDistricts(request):
#   toHTML = {}
#   region = request.GET.get('region', None)

#   districts = District.objects.filter(reg_code = region).order_by('district')
  

#   toHTML['districts'] = districts
#   return render(request, 'portal/snippets/districts.html', toHTML)

# def getProtectedArea(request):
#   toHTML = {}

#   protected_areas = ProtectedArea.objects.all().order_by('reserve_na')

#   toHTML['protected_areas'] = protected_areas
  
#   return render(request, 'portal/snippets/protected-areas.html', toHTML)

# def returnsimplify(geom, simplifyvalue= 0.001):
#   return geom.simplify(simplifyvalue).geojson

# # PROTECTED AREA FOOTPRINTS
# def footprintByProtectedAreas(request):
#   initGEE()
#   toHTML = {}
  
#   protected_area = request.GET.get('protected_area', None)
#   year = request.GET.get('year', None)
#   compare_year1 = request.GET.get('year1', None)
#   compare_year2 = request.GET.get('year2', None)


#   protected_area_obj = ProtectedArea.objects.get(id = protected_area)

#   style = {}

#   polygon = ast.literal_eval(returnsimplify(protected_area_obj.geom))
#   geometry = ee.Geometry(polygon)

#   # FOOTPRINT WITHOUT COMPARE
#   if compare_year1 is None or compare_year2 is None:
#     if year == '2015':
#       style['palette'] = '#fcfa00'
#     elif year == '2018':
#       style['palette'] = '#fcfa00'
#     elif year == '2022':
#       style['palette'] = '#fcfa00'
#     else:
#       style['palette'] = '#fcfa00'

#     footprint = ee.Image(f'{gee_asset}{year}')



#     clip_area = footprint.clip(geometry)

#     idfeatures = clip_area.getMapId(style)

#     toHTML['mapid'] = str(idfeatures['tile_fetcher'].url_format)
#     toHTML['token'] = idfeatures['token']
#     toHTML['polygon'] = polygon



#   else:
#     footprint1 = ee.Image(f'{gee_asset}{compare_year1}')
#     footprint2 = ee.Image(f'{gee_asset}{compare_year2}')

#     clip_area1 = footprint1.clip(geometry)
#     clip_area2 = footprint2.clip(geometry)

#     idfeatures1 = clip_area1.getMapId(style1)
#     idfeatures2 = clip_area2.getMapId(style2)

#     toHTML['mapid_1'] = str(idfeatures1['tile_fetcher'].url_format)
#     toHTML['token_1'] = idfeatures1['token']
#     toHTML['mapid_2'] = str(idfeatures2['tile_fetcher'].url_format)
#     toHTML['token_2'] = idfeatures2['token']
#     toHTML['polygon'] = polygon



#   return JsonResponse(toHTML, safe = False)

# # FOOTPRINT PER YEAR
# def loadFootprint(request):
#   initGEE()
#   toHTML = {}
#   data = {}
#   style = {}

#   national_code = request.GET.get('national', None)
#   region_code = request.GET.get('region', None)
#   district_code = request.GET.get('district', None)
#   year = request.GET.get('year', None)
#   compare_year1 = request.GET.get('year1', None)
#   compare_year2 = request.GET.get('year2', None)

#   layer = request.GET.get('layer', None)

#   if year == '2015':
#     style['palette'] = '#fcfa00'
#   elif year == '2018':
#     style['palette'] = '#fcfa00'
#   elif year == '2022':
#     style['palette'] = '#fcfa00'
#   else:
#     style['palette'] = '#fcfa00'

#   # Check for National
#   if national_code is not None:
    
#     national_obj = NationalBoundary.objects.all().annotate(area = Area('geom')).first()
#     polygon = ast.literal_eval(returnsimplify(national_obj.geom))

#     geometry = ee.Geometry(polygon)


#     # FOOTPRINT WITHOUT COMPARE
#     if compare_year1 is None or compare_year2 is None:
#       # Styling for Layer
#       if layer is not None:
#         if year == '2015':
#           style['palette'] = '#fcfa00'
#         elif year == '2018':
#           style['palette'] = '#ec0cdf'
#         elif year == '2021':
#           style['palette'] = '#7f4695'
#         elif year == '2022':
#           style['palette'] = '#0097fc'

#       footprint = ee.Image(f'{gee_asset}{year}')
#       if year == '2021':
#         footprint = ee.Image(f'{gee_projects_assets}{year}_footprint')


#       clip_area = footprint.clip(geometry)
      
#       idfeatures = clip_area.getMapId(style)

#       toHTML['mapid'] = str(idfeatures['tile_fetcher'].url_format)
#       toHTML['token'] = idfeatures['token']
#       toHTML['polygon'] = polygon
#       toHTML['size'] = national_obj.area.sq_m

#     else:
#       footprint1 = ee.Image(f'{gee_asset}{compare_year1}')
#       footprint2 = ee.Image(f'{gee_asset}{compare_year2}')

#       clip_area1 = footprint1.clip(geometry)
#       clip_area2 = footprint2.clip(geometry)

#       idfeatures1 = clip_area1.getMapId(style1)
#       idfeatures2 = clip_area2.getMapId(style2)

#       toHTML['mapid_1'] = str(idfeatures1['tile_fetcher'].url_format)
#       toHTML['token_1'] = idfeatures1['token']
#       toHTML['mapid_2'] = str(idfeatures2['tile_fetcher'].url_format)
#       toHTML['token_2'] = idfeatures2['token']
#       toHTML['polygon'] = polygon
#       toHTML['size'] = national_obj.area.sq_m
      
#   # Check for Region
#   elif region_code is not None:
#     region_obj = Region.objects.annotate(area = Area('geom')).get(reg_code = region_code)

#     polygon = ast.literal_eval(returnsimplify(region_obj.geom))
#     geometry = ee.Geometry(polygon)

#     # FOOTPRINT WITHOUT COMPARE
#     if compare_year1 is None or compare_year2 is None:
#       footprint = ee.Image(f'{gee_asset}{year}')
#       if year == '2021':
#         footprint = ee.Image(f'{gee_projects_assets}{year}_footprint')
      
#       clip_area = footprint.clip(geometry)
      
#       idfeatures = clip_area.getMapId(style)

#       toHTML['mapid'] = str(idfeatures['tile_fetcher'].url_format)
#       toHTML['token'] = idfeatures['token']
#       toHTML['polygon'] = polygon
#       toHTML['size'] = region_obj.area.sq_m
#     else:
#       footprint1 = ee.Image(f'{gee_asset}{compare_year1}')
#       footprint2 = ee.Image(f'{gee_asset}{compare_year2}')

#       clip_area1 = footprint1.clip(geometry)
#       clip_area2 = footprint2.clip(geometry)

#       idfeatures1 = clip_area1.getMapId(style1)
#       idfeatures2 = clip_area2.getMapId(style2)

#       toHTML['mapid_1'] = str(idfeatures1['tile_fetcher'].url_format)
#       toHTML['token_1'] = idfeatures1['token']
#       toHTML['mapid_2'] = str(idfeatures2['tile_fetcher'].url_format)
#       toHTML['token_2'] = idfeatures2['token']
#       toHTML['polygon'] = polygon
#       toHTML['size'] = region_obj.area.sq_m

#   # Check for District
#   elif district_code is not None:
#     district_obj = District.objects.annotate(area = Area('geom')).get(district_code = district_code)
    
#     polygon = ast.literal_eval(returnsimplify(district_obj.geom))
#     geometry = ee.Geometry(polygon)

#     if compare_year1 is None or compare_year2 is None:
#       footprint = ee.Image(f'{gee_asset}{year}')
#       if year == '2021':
#         footprint = ee.Image(f'{gee_projects_assets}{year}_footprint')
      
#       clip_area = footprint.clip(geometry)
      
#       idfeatures = clip_area.getMapId(style)

#       region_obj = Region.objects.get(reg_code = district_obj.reg_code)

#       try:
#         district_area = DistrictGalamseyArea.objects.get(district_name = district_obj.district, year = year)
#         region_area = RegionGalamseyArea.objects.get(region_name = region_obj.region, year = year)

#         data['region'] = region_obj.region
#         data['district'] = district_obj.district
#         data['district_area'] = district_area.area_value
#         data['region_area'] = region_area.area_value
#         data['year'] = year
#         toHTML['size'] = district_obj.area.sq_m

#       except DistrictGalamseyArea.DoesNotExist:
#         try:
#           region_area = RegionGalamseyArea.objects.get(region_name = region_obj.region, year = year)
#           data['region'] = region_obj.region
#           data['district'] = district_obj.district
#           data['district_area'] = 0
#           data['region_area'] = region_area.area_value
#           data['year'] = year
#           toHTML['size'] = district_obj.area.sq_m
#         except RegionGalamseyArea.DoesNotExist:
#           data['region'] = region_obj.region
#           data['district'] = district_obj.district
#           data['district_area'] = 0
#           data['region_area'] = 0
#           data['year'] = year
#           toHTML['size'] = district_obj.area.sq_m

#       toHTML['mapid'] = str(idfeatures['tile_fetcher'].url_format)
#       toHTML['token'] = idfeatures['token']
#       toHTML['polygon'] = polygon
#       toHTML['data'] = data
#     else:
#       footprint1 = ee.Image(f'{gee_asset}{compare_year1}')
#       footprint2 = ee.Image(f'{gee_asset}{compare_year2}')

#       clip_area1 = footprint1.clip(geometry)
#       clip_area2 = footprint2.clip(geometry)

#       idfeatures1 = clip_area1.getMapId(style1)
#       idfeatures2 = clip_area2.getMapId(style2)

#       toHTML['mapid_1'] = str(idfeatures1['tile_fetcher'].url_format)
#       toHTML['token_1'] = idfeatures1['token']
#       toHTML['mapid_2'] = str(idfeatures2['tile_fetcher'].url_format)
#       toHTML['token_2'] = idfeatures2['token']
#       toHTML['polygon'] = polygon
#       toHTML['size'] = district_obj.area.sq_m

#   return JsonResponse(toHTML, safe=False)


# # LOAD FOOTPRINT LAYER
# def loadingFootprint(request):
#   year = request.GET.get('year', None)
#   all_footprints = Footprints.objects.all()
#   resultPolygon = []

#   if year:
#     print(year)
#     footprints = all_footprints.filter(year = year)
#     print(footprints.count())

#     for footprint in footprints:
#       print(footprint)
#       properties = {}
#       # print(footprint.pk)

#       properties['year'] = footprint.year
#       properties['status'] = footprint.status
#       properties['area_ha'] = footprint.area_ha
#       properties['area_sqkm'] = footprint.area_sqkm

#       resultPolygon.append({'geometry': ast.literal_eval(footprint.geom.geojson), 'type': 'Feature', 'properties': properties})

#   return JsonResponse(resultPolygon, safe=False)


# def querydataView(request):
#     status = request.GET.get("status")
#     value = request.GET.get("value")

#     if status == "date":
#         results = TblLocation.objects.filter(
#             event_date__date=value).distinct("user")

#     elif status == "user":
#         results = TblLocation.objects.filter(
#             user__full_name__icontains=value).distinct("user")

#         # asd= TblLocation.objects.filter(event_date__date=value)
#     elif status == "territory":
#         results = TblLocation.objects.filter(
#             user__territory_id=value).distinct("user")

#     return render(request, 'portal/queryresult.html', locals())


# def maprouteView(request):
#     resulpoygon = []
#     route = []
#     code = request.GET.get("code")
#     status = request.GET.get("status")
#     date = request.GET.get("date")
#     text = request.GET.get("text")

#     if status and date:
#         asd = TblLocation.objects.filter(user_id=code, event_date__date=date)
#     else:
#         asd = TblLocation.objects.filter(user_id=code, event_date__date=today)
#         # if status == "user":
#         #     TblLocation.objects.filter(user_id=code, event_date__date=today)
#         # else:
#         #     TblLocation.objects.filter(user_id=code, event_date__date=today)

#     opo = TblLocation.objects.filter(user_id=code).latest("id")
#     lng = float(opo.longitude.replace("'", ""))
#     lat = float(opo.latitude.replace("'", ""))
#     for aa in asd:
#         lng1 = float(aa.longitude.replace("'", ""))
#         lat1 = float(aa.latitude.replace("'", ""))
#         route.append([lat1, lng1])
#         print(lng1, lat1)
#         geom = Point(lng1, lat1)
#         properties = {}
#         user = TblUsers.objects.get(id=aa.user_id)
#         properties['full_name'] = user.full_name
#         properties['latitude'] = aa.latitude
#         properties['longitude'] = aa.longitude
#         properties['accuracy'] = aa.accuracy
#         properties['event_date'] = str(aa.event_date)
#         username = user.full_name
#         try:

#             resulpoygon.append({"geometry": ast.literal_eval(returnsimplify(
#                 geom)), "type": "Feature", "properties": properties, "id": str(aa.id)})
#             # #print resulpoygon
#         except Exception as e:
#             raise

#     routepoint = route
#     pointz = resulpoygon
#     print(pointz)
#     return render(request, 'portal/maproute.html', locals())


# def randomcolor():
#     random_number = random.randint(0, 16777215)
#     hex_number = str(hex(random_number))
#     hex_number = '#' + hex_number[2:]
#     return hex_number


# today = date.today()


# def locView(request):
#     resulpoygon = []
#     asd = TblLocation.objects.filter(
#         event_date__date=today).distinct("user_id")
#     for aa in asd:
#         lng = float(aa.longitude.replace("'", ""))
#         lat = float(aa.latitude.replace("'", ""))

#         # print(aa.full_name,aa.telephone)
#         geom = [lng, lat]
#         properties = {}
#         user = TblUsers.objects.get(id=aa.user_id)
#         properties['full_name'] = user.full_name
#         properties['telephone'] = user.telephone
#         # properties['longitude']=aa.longitude
#         properties['user_id'] = user.id
#         properties['event_date'] = str(
#             aa.event_date.date()) + "  " + str(aa.event_date.time())
#         properties['color'] = randomcolor()

#         try:

#             resulpoygon.append({"type": "Feature", "properties": properties, "id": str(aa.id) , "geometry": {"type": "Point",
#         "coordinates": geom }})
#             # resulpoygon.append({"geometry": ast.literal_eval(returnsimplify(
#             #     geom)), "type": "Feature", "properties": properties, "id": str(aa.id)})
#             # #print resulpoygon
#         except Exception as e:
#             raise
#     return JsonResponse(resulpoygon, safe=False)

# var geojsonFeature = {
#     "type": "Feature",
#     "properties": {
#         "name": "Coors Field",
#         "amenity": "Baseball Stadium",
#         "popupContent": "This is where the Rockies play!"
#     },
#     "geometry": {
#         "type": "Point",
#         "coordinates": [-104.99404, 39.75621]
#     }
# };
# def mapdetailsView(request):
#     resulpoygon = []
#     route = []
#     counter = 0
#     code = request.GET.get("code")
#     status = request.GET.get("status")
#     date = request.GET.get("date")
#     text = request.GET.get("text")
#     pointstyle = request.GET.get("pointstyle")
#     if status and date:
#         asd = TblLocation.objects.filter(
#             user_id=code, event_date__date=date).order_by("event_date")
#     else:
#         asd = TblLocation.objects.filter(
#             user_id=code, event_date__date=today).order_by("event_date")
#     # asd = TblLocation.objects.filter(user_id=code).order_by("event_date")
#     opo = TblLocation.objects.filter(user_id=code).latest("id")
#     lng = float(opo.longitude.replace("'", ""))
#     lat = float(opo.latitude.replace("'", ""))
#     for aa in asd:
#         counter += 1
#         lng1 = float(aa.longitude.replace("'", ""))
#         lat1 = float(aa.latitude.replace("'", ""))
#         route.append([lat1, lng1])

#         geom = Point(lng1, lat1)
#         properties = {}
#         properties['full_name'] = aa.user.full_name
#         properties['user_id'] = aa.user.id
#         properties['order'] = counter
#         properties['event_date'] = str(aa.event_date)

#         try:

#             resulpoygon.append({"geometry": ast.literal_eval(returnsimplify(
#                 geom)), "type": "Feature", "properties": properties, "id": str(aa.id)})
#             # #print resulpoygon
#         except Exception as e:
#             raise

#     routepoint = route
#     pointz = resulpoygon
#     if pointstyle == "line":
#         return JsonResponse(routepoint, safe=False)
#     else:
#         return JsonResponse(pointz, safe=False)


# class territoryView(GeoJSONLayerView):
#     model = Territory
#     precision = 4
#     simplify = 0.001
#     properties = ('territory_id', 'territory_name',)


# def territoryView(request):
# 	resulpoygon = []
# 	route=[]
# 	counter=0
# 	code =request.GET.get("code")
# 	pointstyle =request.GET.get("pointstyle")
# 	asd= Territory.objects.all()[:1]


# 	for aa in asd :
# 		counter += 1
# 		properties={}
# 		properties['territory_name']=aa.territory_name
# 		properties['territory_id']=aa.id
# 		# properties['order']= counter
# 		# properties['event_date']=str(aa.event_date)

# 		try:

# 			resulpoygon.append({"geometry":ast.literal_eval(returnsimplify(aa.geom)),"type":"Feature","properties":properties,"id":str(aa.id)})
# 			# #print resulpoygon
# 		except Exception as e:
# 			raise


# 	return JsonResponse(resulpoygon , safe=False)


# def topolygon(resulpoygon):
#     mainjson = []
#     mainjson.append({"crs": {"type": "link", "properties": {"href": "http://spatialreference.org/ref/epsg/4326/",
#                                                             "type": "proj4"}}, "type": "FeatureCollection", "features": resulpoygon})
#     return mainjson


# def returnsimplify(geom, simplifyvalue=0.001):
#     # return geom.simplify(simplifyvalue, preserve_topology=True).geojson
#     return geom.simplify(simplifyvalue).geojson


# def returnsimplify1(geom, simplifyvalue=0):
#     # return geom.simplify(simplifyvalue, preserve_topology=True).geojson
#     return geom.simplify(simplifyvalue).geojson



