from django.contrib import admin
from .models import Service, GlobalPartner

# Register your models here.

@admin.register(Service)

class ServicesAdmin(admin.ModelAdmin):
    pass


@admin.register(GlobalPartner)

class GlobalPartnersAdmin(admin.ModelAdmin):
    pass