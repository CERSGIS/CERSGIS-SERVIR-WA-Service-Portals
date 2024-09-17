from django.shortcuts import render
from django.db.models.expressions import OuterRef, Exists

from .models import Record, Record_coordinate, User_data

# Create your views here.
template_path='landscape_gh/'

def indexView(request):
  toHTML = {}

  # toHTML['records'] = Record.objects.annotate(coordinates = Record_coordinate.objects.filter(record_fk = OuterRef('id')).values())
  # print(toHTML['records'])
  return render(request, f'{template_path}dashboard.html', toHTML)

def mapView(request):
  record_id = request.GET.get('record_id')

  

  return render(request, f'{template_path}map.html')


# def indexView(request):
#   toHTML = {}

#   record_coord = Record_coordinate.objects.all()
#   user_data = User_data.objects.all()
#   data = (record_coord + user_data)
#   toHTML['records'] = {data}
#   print(toHTML)
#   return render(request, f'{template_path}dashboard.html', toHTML)
