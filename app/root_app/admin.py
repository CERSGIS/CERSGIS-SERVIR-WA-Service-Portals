from django.contrib import admin
from .models import Report
from django.utils.text import Truncator


# Register your models here.

@admin.register(Report)

class ReportsAdmin(admin.ModelAdmin):
    list_display = ('title', 'service', 'short_description', 'created_at',)
    list_filter = ('service',)

    def short_description(self, obj):
        return Truncator(obj.description).chars(35)
    
    short_description.short_description = 'Description'
