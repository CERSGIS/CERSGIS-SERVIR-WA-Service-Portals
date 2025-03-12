from django.shortcuts import render
from galamsey_portal.models import Partner
from .models import *
# Create your views here.

def reportsView(request):
    path = request.path

    id = request.GET.get('id', None)
    toHTML  ={}

    # GET SINGLE REPORT
    # check if id is empty
    if id:
        toHTML["report"] = Report.objects.get(id=id)
        toHTML["reports"] = Report.objects.order_by("-created_at")[:5]
        return render(request, 'root_app/pages/report-details.html', toHTML)

    #------------- GET ALL -----------
    else:
        if "mining-portal" in path:
            report_data = Report.objects.filter(service='GALAMSEY').order_by('id')
        elif "charcoal" in path:
            report_data = Report.objects.filter(service='CHARCOAL').order_by('id')
        else:
            report_data = Report.objects.all().order_by('id')

        toHTML['reports'] = report_data

        return render(request, 'root_app/pages/reports.html', toHTML)
 
 

def mapsView(request):

    return render(request, 'root_app/pages/maps.html')

def singleMapView(request):

    return render(request, 'root_app/pages/map-details.html')

def articlesView(request):

    return render(request, 'root_app/pages/articles.html')

def articleView(request):

    return render(request, 'root_app/pages/article-details.html')

def contactView(request):

    return render(request, 'root_app/pages/contact.html')