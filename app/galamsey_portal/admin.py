from django.contrib import admin
from .models import AppDetails, Partner, FootprintYear, PilotFootprintRegion, ReferenceWafordData, ReferenceWafordColorPalette, AdditionalLayer, DataRequest
from django.utils.text import Truncator

# Register your models here.

@admin.register(AppDetails)

class AppDetailsAdmin(admin.ModelAdmin):
    fieldsets = [
        ( None, {"fields" : ["app_name", "disclaimer", "details", ]}),
        ("Top Nav", {"fields": ["top_nav_background_color", "top_nav_color", "top_nav_border_color"]}),
        ("Side Nav", {"fields": ["side_nav_background_color", "side_nav_color", "side_nav_icon_color"]}),
        ("Box", {"fields": ["box_top_color", "box_top_text_color",]}),
        ("Analysis", {"fields": ["analysis_background", "analysis_background_size",]})
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

@admin.register(FootprintYear)

class FootprintYearAdmin(admin.ModelAdmin):
    list_display = ['year', 'fill_color', 'border_color', 'tiffPath']

    fieldsets = [
        (None, {"fields": ['year']}),
        ("Styling", {"fields": ['fill_color', 'border_color']}),
        ("Tiff File Upload", {'fields': ['tiff_file']})
    ]

@admin.register(PilotFootprintRegion)

class PilotFootprintRegionAdmin(admin.ModelAdmin):
    list_display = ['reg_code', 'region']


@admin.register(ReferenceWafordData)
class ReferenceWafordDataAdmin(admin.ModelAdmin):
    list_display = ['year']
    
@admin.register(ReferenceWafordColorPalette)
class ReferenceWafordColorPaletteAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields" : ["low_forest_cover","open_forest","closed_forest","degradation","open_forest_loss","closed_forest_loss","open_forest_recovery","closed_forest_recovery"]})
    
    ]
    def has_add_permission(self, request):
    # if there's already an entry, do not allow adding
        if ReferenceWafordColorPalette.objects.exists():
            return False
        return True
    

@admin.register(AdditionalLayer)

class AdditionalLayersAdmin(admin.ModelAdmin):
    pass

@admin.register(DataRequest)

class DataRequestAdmin(admin.ModelAdmin):
    list_filter = ('email',)
    list_display = ('name', 'email', 'short_subject', 'short_comments')

    def short_subject(self, obj):
        return Truncator(obj.subject).chars(35)

    def short_comments(self, obj):
        return Truncator(obj.comments).chars(50)

    short_subject.short_description = 'Subject'
    short_comments.short_description = 'Comments' 
