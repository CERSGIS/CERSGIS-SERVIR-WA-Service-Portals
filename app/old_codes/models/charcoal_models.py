from django.db import models
from django.contrib.gis.db import models
# Create your models here.


# class AppDetails(models.Model):
#     app_name = models.CharField(max_length=150)
#     disclaimer = models.CharField(max_length=500, blank=True, null=True)
#     details = models.CharField(max_length=800, blank=True, null=True)
#     top_nav_background_color = models.CharField(max_length=50, blank=True, null=True)
#     top_nav_color = models.CharField(max_length=50, blank=True, null=True)
#     side_nav_background_color = models.CharField(max_length=50, blank=True, null=True)
#     side_nav_color = models.CharField(max_length=50, blank=True, null=True)
#     side_nav_icon_color = models.CharField(max_length=50, blank=True, null=True)

#     class Meta:
#         verbose_name_plural = 'App Details'

# class Partner(models.Model):
#     name = models.CharField(max_length=250, unique=True)
#     logo = models.ImageField(upload_to='logo/', blank=True, null=True)
#     url = models.URLField(blank=True, null=True)


# class NationalBoundary(models.Model):
#     id = models.IntegerField(primary_key=True)
#     geom = models.GeometryField(blank=True, null=True)
#     objectid = models.IntegerField(blank=True, null=True)
#     objectid_2 = models.FloatField(blank=True, null=True)
#     shape_leng = models.FloatField(blank=True, null=True)
#     shape_area = models.FloatField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'national_boundary'

# class Region(models.Model):
#     reg_code = models.CharField(primary_key=True, max_length=250)
#     geom = models.GeometryField(blank=True, null=True)
#     id = models.IntegerField(blank=True, null=True)
#     region = models.CharField(max_length=50, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'region'

# class AreaOfInterest(models.Model):
#     id = models.IntegerField(primary_key=True)
#     geom = models.GeometryField(blank=True, null=True)
#     region = models.CharField(max_length=50, blank=True, null=True)
#     district = models.CharField(max_length=50, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'area_of_interest'

# class Points(models.Model):
#     id = models.IntegerField(primary_key=True)
#     geom = models.GeometryField(blank=True, null=True)
#     region = models.CharField(max_length=254, blank=True, null=True)
#     district = models.CharField(max_length=254, blank=True, null=True)
#     latitude = models.FloatField(blank=True, null=True)
#     longitude = models.FloatField(blank=True, null=True)
#     year = models.BigIntegerField(blank=True, null=True)
#     type = models.CharField(max_length=254, blank=True, null=True)
#     dimension = models.FloatField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'points'