from django.contrib import admin
from .models import Service, GlobalPartner, RecipientEmail

# Register your models here.

@admin.register(Service)

class ServicesAdmin(admin.ModelAdmin):
    pass


@admin.register(GlobalPartner)

class GlobalPartnersAdmin(admin.ModelAdmin):
    pass

@admin.register(RecipientEmail)

class RecipientEmailsAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'receive_galamsey_email', 'receive_charcoal_email')
    list_filter = ('receive_galamsey_email', 'receive_charcoal_email')