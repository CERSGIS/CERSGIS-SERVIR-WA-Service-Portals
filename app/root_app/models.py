from django.db import models

# Create your models here.


class Report(models.Model):
    SERVICES = [
    ('GALAMSEY', 'Galamsey Service'),
    ('CHARCOAL', 'Charcoal Service'),
    ]
        
    title = models.CharField(max_length=250, unique=True)
    service = models.CharField(max_length=20, choices=SERVICES, default='GALAMSEY')
    image = models.ImageField(upload_to='image/', blank=True, null=True)
    document = models.FileField(upload_to="reports")
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)