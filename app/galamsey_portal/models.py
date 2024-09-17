from django.db import models
from django.contrib.gis.db import models
from colorfield.fields import ColorField

import datetime
# Create your models here.

# GALAMSEY
class AppDetails(models.Model):
    app_name = models.CharField(max_length=150)
    disclaimer = models.CharField(max_length=500, blank=True, null=True)
    details = models.CharField(max_length=800, blank=True, null=True)
    top_nav_background_color = ColorField(default='#FF0000')
    top_nav_color = ColorField(default='#FF0000')
    top_nav_border_color = ColorField(default='#FF0000')
    side_nav_background_color = ColorField(default='#000000')
    side_nav_color = ColorField(default='#FFFFFF')
    side_nav_icon_color = ColorField(default='#FF0000')
    box_top_color = ColorField(default='#000000')
    box_top_text_color = ColorField(default='#FFFFFF')
    analysis_background = models.CharField(max_length=1000, null=True, blank=True)
    analysis_background_size = models.CharField(max_length=250, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'App Details'

class Partner(models.Model):
    name = models.CharField(max_length=250, unique=True)
    logo = models.ImageField(upload_to='logo/', blank=True, null=True)
    url = models.URLField(blank=True, null=True)


class Report(models.Model):
    name = models.CharField(max_length=250, unique=True)
    image = models.ImageField(upload_to='image/', blank=True, null=True)
    document = models.FileField(upload_to="reports")

def upload_tiff_location(instance, filename):
    filebase, extension = filename.split('.')
    return 'galamsey/footprints/footprint_%s.%s' % (instance.year, extension)

class FootprintYear(models.Model):
    year = models.CharField(max_length=4)
    tiff_file = models.FileField(upload_to= upload_tiff_location, blank = True, null = True )
    fill_color = ColorField(default='#FF0000')
    border_color = ColorField(default='#000000')

    class Meta:
        verbose_name = 'Footprint Year'
        verbose_name_plural = 'Footprint Years'

    @property
    def tiffPath(self):
        try:
            url = self.tiff_file.url
        except:
            url = ''
        
        return url

class DataRequest(models.Model):
    name = models.CharField(max_length=250)
    email = models.CharField(max_length=250)
    subject = models.CharField(max_length=250, null=True, blank=True)
    comments = models.TextField(null=True, blank=True)

class PilotFootprintRegion(models.Model):
    reg_code = models.CharField(max_length=50, unique=True)
    region = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Pilot Region'
        verbose_name_plural = 'Pilot Regions'