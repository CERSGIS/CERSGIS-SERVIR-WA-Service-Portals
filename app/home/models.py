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

class RecipientEmail(models.Model):
    first_name = models.CharField(max_length=250, unique=True)
    last_name = models.CharField(max_length=250, unique=True)
    email = models.EmailField(unique=True, blank=True)
    receive_galamsey_email = models.BooleanField(default=False)
    receive_charcoal_email = models.BooleanField(default=False)
