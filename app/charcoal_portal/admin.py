from django.contrib import admin
from .models import AppDetails, Partner, CharcoalPointYear, CharcoalRegion, DataRequest
# Register your models here.

@admin.register(AppDetails)

class AppDetailsAdmin(admin.ModelAdmin):
    fieldsets = [
        ( None, {"fields" : ["app_name", "disclaimer", "details", ]}),
        ("Top Nav", {"fields": ["top_nav_background_color", "top_nav_color", "top_nav_border_color"]}),
        ("Side Nav", {"fields": ["side_nav_background_color", "side_nav_color", "side_nav_icon_color"]}),
        ("Box", {"fields": ["box_top_color", "box_top_text_color",]})
    ]
    
    def has_add_permission(self, request):
    # if there's already an entry, do not allow adding
        if AppDetails.objects.exists():
            return False
        return True
    
@admin.register(Partner)

class PartnersAdmin(admin.ModelAdmin):
    pass   

# @admin.register(Report)

# class ReportsAdmin(admin.ModelAdmin):
#     pass


@admin.register(CharcoalPointYear)

class CharcoalPointYearAdmin(admin.ModelAdmin): 
    list_display = ['year', 'fill_color', 'border_color']

    fieldsets = [
        (None, {"fields": ['year']}),
        ("Styling", {"fields": ['fill_color', 'border_color']})
    ]

@admin.register(CharcoalRegion)

class CharcoalRegionAdmin(admin.ModelAdmin):
    list_display = ['reg_code', 'region']


@admin.register(DataRequest)

class DataRequestAdmin(admin.ModelAdmin):
    pass