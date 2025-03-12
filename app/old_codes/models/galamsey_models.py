from django.db import models
from django.contrib.gis.db import models
# Create your models here.

# GALAMSEY
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


# class Report(models.Model):
#     name = models.CharField(max_length=250, unique=True)
#     image = models.ImageField(upload_to='image/', blank=True, null=True)
#     document = models.FileField(upload_to="reports")


# class District(models.Model):
#     geom = models.GeometryField(blank=True, null=True)
#     region = models.CharField(max_length=50, blank=True, null=True)
#     district = models.CharField(max_length=50, blank=True, null=True)
#     district_code = models.CharField(max_length=254, blank=True, null=True)
#     reg_code = models.CharField(max_length=250, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'district'


# class Region(models.Model):
#     geom = models.GeometryField(blank=True, null=True)
#     region = models.CharField(max_length=50, blank=True, null=True)
#     reg_code = models.CharField(primary_key=True, max_length=250)

#     class Meta:
#         managed = False
#         db_table = 'region'

# class ProtectedArea(models.Model):
#     geom = models.GeometryField(blank=True, null=True)
#     reserve_na = models.CharField(max_length=30, blank=True, null=True)
#     region = models.CharField(max_length=30, blank=True, null=True)
#     area_sqkm = models.FloatField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'Protected Area'

# class MineralConcession(models.Model):
#     geom = models.GeometryField(blank=True, null=True)
#     company_nu = models.BigIntegerField(blank=True, null=True)
#     company_na = models.CharField(max_length=50, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'mineral_concession'


# class NationalBoundary(models.Model):
#     geom = models.GeometryField(blank=True, null=True)
#     objectid = models.IntegerField(blank=True, null=True)
#     objectid_2 = models.FloatField(blank=True, null=True)
#     shape_leng = models.FloatField(blank=True, null=True)
#     shape_area = models.FloatField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'national_boundary'

# class AreaOfInterest(models.Model):
#     geom = models.GeometryField(blank=True, null=True)
#     region = models.CharField(max_length=50, blank=True, null=True)
#     shape_leng = models.FloatField(blank=True, null=True)
#     areasq_km = models.FloatField(blank=True, null=True)
#     areaha = models.BigIntegerField(blank=True, null=True)
#     shape_le_1 = models.FloatField(blank=True, null=True)
#     shape_area = models.FloatField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'area_of_interest'
    
# class Footprints(models.Model):
#     geom = models.GeometryField(blank=True, null=True)
#     year = models.CharField(max_length=254, blank=True, null=True)
#     status = models.CharField(max_length=50, blank=True, null=True)
#     area_ha = models.FloatField(blank=True, null=True)
#     area_sqkm = models.FloatField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'footprints'

# class Settlements(models.Model):
#     geom = models.GeometryField(blank=True, null=True)
#     fid_major_field = models.BigIntegerField(db_column='fid_major_', blank=True, null=True)  # Field renamed because it ended with '_'.
#     town_name = models.CharField(max_length=50, blank=True, null=True)
#     region = models.CharField(max_length=20, blank=True, null=True)
#     status = models.CharField(max_length=30, blank=True, null=True)
#     district = models.CharField(max_length=100, blank=True, null=True)
#     district_c = models.CharField(max_length=5, blank=True, null=True)
#     regional_c = models.CharField(max_length=5, blank=True, null=True)
#     national_c = models.CharField(max_length=5, blank=True, null=True)
#     fid_distri = models.BigIntegerField(blank=True, null=True)
#     region_1 = models.CharField(max_length=50, blank=True, null=True)
#     district_1 = models.CharField(max_length=50, blank=True, null=True)
#     dist_code = models.CharField(max_length=16, blank=True, null=True)
#     label = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'settlements'

# class DistrictGalamseyArea(models.Model):
#     district_name = models.CharField(max_length=100, blank=True, null=True)
#     area_value = models.FloatField(blank=True, null=True)
#     year = models.CharField(max_length=5, blank=True, null=True)

# class RegionGalamseyArea(models.Model):
#     region_name = models.CharField(max_length=100, blank=True, null=True)
#     area_value = models.FloatField(blank=True, null=True)
#     year = models.CharField(max_length=5, blank=True, null=True)

# class ReserveGalamseyArea(models.Model):
#     reserve_name = models.CharField(max_length=100, blank=True, null=True)
#     area_value = models.FloatField(blank=True, null=True)
#     year = models.CharField(max_length=5, blank=True, null=True)

