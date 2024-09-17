from django.db import models

# Create your models here.
class Service(models.Model):
    name = models.CharField(max_length=500, unique=True)
    details = models.CharField(max_length=1000, blank=True, null=True)
    image = models.ImageField(upload_to='service-image/', blank=True, null=True)
    url = models.URLField(unique=True)

class GlobalPartner(models.Model):
    name = models.CharField(max_length=500, unique=True)
    logo = models.ImageField(upload_to='logo/', blank=True, null=True)
    url = models.URLField(unique=True)

