
import ast
from django.shortcuts import render
from django.http import JsonResponse
from djgeojson.views import GeoJSONLayerView
from .models import *
from django.shortcuts import render

import ee
from django.conf import settings

def mapView(request):
  toHTML = {}
  
  toHTML['app_details'] = AppDetails.objects.all().last()
  toHTML['partners'] = Partner.objects.all().order_by('id')
  # toHTML['regions'] = Region.objects.all().order_by('region')
  # toHTML['years'] = Points.objects.all().distinct('year').values()
  # toHTML['years_list'] = list(Points.objects.all().distinct('year').values())

  return render(request, 'charcoal_portal/index.html', toHTML)


def catalogView(request):
    toHTML = {}

    return render(request, 'portal/catalog.html', toHTML)



# def loadingPoints(request):
#   year = request.GET.get('year', None)
#   resultPolygon = []

#   if year:
#     points = Points.objects.filter(year = year)

#     for point in points:
#       properties = {}

#       properties['year'] = point.year
#       properties['longitude'] = point.longitude
#       properties['latitude'] = point.latitude
#       properties['type'] = point.type
#       properties['region'] = point.region
#       properties['year'] = point.year
#       properties['dimension'] = point.dimension
#       properties['district'] = point.district

#       resultPolygon.append({'geometry': ast.literal_eval(point.geom.geojson), 'type': 'Feature', 'properties': properties})

#   return JsonResponse(resultPolygon, safe=False)

# class regionView(GeoJSONLayerView):
#   model = Region
#   precision = 4
#   simplify = 0.001
#   properties = ('region', 'reg_code')

# # LOAD AREA OF INTEREST
# class loadAoi(GeoJSONLayerView):
#   model = AreaOfInterest
#   precision = 4
#   simplify = 0.001
#   properties = ('region', 'district')
