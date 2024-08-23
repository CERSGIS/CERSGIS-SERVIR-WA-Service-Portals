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

host_email = settings.EMAIL_HOST_USER
recipient_emails = settings.RECIPIENT_EMAILS
geoserver_url = settings.GEOSERVER_BASE_URL


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


def mapView(request):
  toHTML = {}

  charcoalData = CharcoalPointYear.objects.all().order_by('year')
  toHTML['app_details'] = AppDetails.objects.all().last()
  toHTML['partners'] = Partner.objects.all().order_by('id')
  toHTML['charcoalpoint_years'] = charcoalData
  toHTML['reports'] = Report.objects.all().order_by('id')

  return render(request, 'charcoal_portal/index.html', toHTML)

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

    print("Request data", name, email, subject, comments)
    
    if request.method == "POST":
        if email == None:
            return JsonResponse({'status': '204', 'message': 'Eamail is required'})
        
        try:
            new_data, created = DataRequest.objects.get_or_create(name=name, email=email, subject=subject, comments=comments)

            if created:
                title = f'Data Request from {name} on Charcoal Portal'
                comment = f'Dear sir/madam, \n\nBelow are the details of the request: \n\nName: {name}\nEmail: {email}. \nSubject: {subject} \nComments:{comments}. \n\nThank You.' 

                try:
                    send_mail(title, comment, host_email, recipient_emails)

                except Exception as e:
                    raise e
                
            return JsonResponse({'status': '200', 'message': ' Request successfully sent'})            

        except Exception as e:
            raise e

