from django.db import models
from django.contrib.gis.db import models

# Create your models here.
class Record(models.Model):
  name = models.CharField(max_length=250, null=True, blank=True)
  image = models.ImageField(upload_to='landacape-Gh/image/', null=True, blank=True)
  observation_on_site = models.CharField(max_length=50, null=True, blank=True)
  activity_status = models.CharField(max_length=15, null=True, blank=True)
  charcoal_type = models.CharField(max_length=15, null=True, blank=True)
  comment = models.CharField(max_length=1000, null=True, blank=True)
  audio = models.FileField(upload_to='landscape-Gh/audio/', null=True, blank=True)
  geometry_type = models.CharField(max_length=15, null=True, blank=True)
  geom = models.GeometryField(null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class Record_coordinate(models.Model):
  record_fk = models.ForeignKey(Record, on_delete=models.CASCADE)
  latitude = models.DecimalField(max_digits=15, decimal_places=8)
  longitude = models.DecimalField(max_digits=15, decimal_places=8)
  accuracy = models.DecimalField(max_digits=5, decimal_places=3)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class User_data(models.Model):
  record_fk = models.ForeignKey(Record, on_delete=models.CASCADE)
  name = models.CharField(max_length=250, null=True, blank=True)
  organization = models.CharField(max_length=250, null=True, blank=True)
  contact = models.CharField(max_length=20, null=True, blank=True)
  email = models.EmailField(max_length=255, null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class AppDetails(models.Model):
    app_name = models.CharField(max_length=150)
    disclaimer = models.CharField(max_length=500, blank=True, null=True)
    details = models.CharField(max_length=800, blank=True, null=True)
    top_nav_background_color = models.CharField(max_length=50, blank=True, null=True)
    side_nav_background_color = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'App Details'

class Partner(models.Model):
    name = models.CharField(max_length=250, unique=True)
    logo = models.ImageField(upload_to='logo/', blank=True, null=True)
    url = models.URLField(blank=True, null=True)

  #  .header {
  #           height: 80px !important;
  #           overflow: hidden;
  #           width: 100%;
  #           background-color: {% if app_details %}{{ app_details.top_nav_background_color }}{% else %} #fff {% endif %};
  #       }