from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .functions import check_data_object_is_empty, image_decoding, audio_decoding, geom_calculator

@api_view()
def apiHomeView(request):
  result = {
    'success': True, 
    'message': 'Api Home'
    }
  return Response(result, status.HTTP_200_OK)

@api_view(['POST'])
def apiDataSubmissions(request):
  # Check for POST METHOD
  if request.method == 'POST':
    data = request.data

    # Check if data is empty
    if check_data_object_is_empty(data):
      result = {
        'status': False,
        'message': 'No Content Provided'
      }
      return Response(result, status.HTTP_204_NO_CONTENT)
    
    # TODO: Check if required data keys are present

    # Save Report to Database
    record_name = data['record_name']
    image = data['image_base64']
    observation_on_site = data['observation_on_site']
    activity_status = data['activity_status']
    charcoal_type = data['charcoal_type']
    comment = data['comment']
    audio = data['audio_base64']
    geometry_type = data['geometry_type']
    geometry_value = data['geometry_value']
    user = data['user_data']

    try:
      record_data = Record()
      record_data.name = record_name
      if image:
        print('image')
        record_data.image = image_decoding(image)
      record_data.observation_on_site = observation_on_site
      record_data.activity_status = activity_status
      record_data.charcoal_type = charcoal_type
      record_data.comment = comment
      if audio:
        print('audio')
        record_data.audio = audio_decoding(audio)
      record_data.geometry_type = geometry_type
      record_data.geom = geom_calculator(geometry_type, geometry_value)

      record_data.save()

    except Exception as e:
      result = {
        'status': False,
        'message': ('Error Saving record: ' + str(e))
      }
      return Response(result, status.HTTP_400_BAD_REQUEST)
    
    # Save Coordinates into database
    for value in geometry_value:
      try: 
        record_coord = Record_coordinate()
        record_coord.latitude = value['latitude']
        record_coord.longitude = value['longitude']
        record_coord.accuracy = value['accuracy']
        record_coord.record_fk = record_data

        record_coord.save()

      except Exception as e:
        record_data.delete()

        result = {
          'status': False,
          'message': ('Error Saving Record Coordinates: '+ str(e))
        }
        return Response(result, status.HTTP_400_BAD_REQUEST)
      
    # Save User Information
    if user:
      try:
        user_data = User_data()
        user_data.name = user['user_name']
        user_data.organization = user['user_organization']
        user_data.contact = user['user_contact']
        user_data.email = user['user_mail']
        user_data.record_fk = record_data

        user_data.save()
        
      except Exception as e:
        record_data.delete()
        record_coord.delete()
        result = {
        'status': False,
        'message': ('Error Saving record: ' + str(e))
        }
        return Response(result, status.HTTP_400_BAD_REQUEST)        

    result = {
      'status': True,
      'message': 'Record Saved Successfully',
      'record': record_data.id
    }
    return Response(result, status.HTTP_201_CREATED)
  