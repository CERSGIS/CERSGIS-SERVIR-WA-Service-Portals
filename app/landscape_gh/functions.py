#############################################################
#                     HELPER FUNCTIONS                      #
#############################################################
def check_data_object_is_empty(data):
  """ Checks if the data object and its keys are empty, none or null and return True if Empty """
  return not bool(data)
  # if bool(data):
  #   for key in data:
  #     print(data[key])
  #     if data[key] == '' or data[key] == None:
  #       return True
  # else: 
  #   return True
  # return False

def geom_calculator(type, values):
  """ Calculates the GEOM from a given Latiude and Longitude depending on the geometry type """
  from django.contrib.gis.geos import GEOSGeometry, Point, LineString, Polygon
  try:
    coords = ()
    match type:
      case 'Point':
        for value in values:
          latitude = float(value['latitude'])
          longitude = float(value['longitude'])

          coords += (longitude, latitude,)

        return GEOSGeometry(Point(coords))
      case 'Line':
        for value in values:
          latitude = float(value['latitude'])
          longitude = float(value['longitude'])

          coords += ((longitude, latitude,),)
          
        return GEOSGeometry(LineString(coords))
      case 'Polygon':
        for value in values:
          latitude = float(value['latitude'])
          longitude = float(value['longitude'])

          coords += ((longitude, latitude,),)

        return GEOSGeometry(Polygon(coords))
      case default:
        for value in values:
          latitude = float(value['latitude'])
          longitude = float(value['longitude'])

          coords += (longitude, latitude,)

        return GEOSGeometry(Point(coords))

  except Exception as e:
    print(e)

def image_decoding(image):
  """ Converts the base64 image string to an Image File and returns it"""
  import base64, uuid
  from django.core.files.base import ContentFile

  ext = '.jpg'

  data = ContentFile(base64.b64decode(image), name = f'{uuid.uuid4()}{ext}')

  return data

def audio_decoding(audio):
  """ Converts the base64 Audio string to an Audio format and returns it """
  import base64, uuid
  from django.core.files.base import ContentFile

  ext = '.m4a'

  data = ContentFile(base64.b64decode(audio), name = f'{uuid.uuid4()}{ext}')

  return data