from django.shortcuts import render
from django.core.paginator import Paginator
from home.models import Service, GlobalPartner


# Create your views here.

def homeView(request):
    page = int(request.GET.get('page', 1))

    toHTML = {}

    paginator = Paginator(Service.objects.all().order_by('-id'), 8)
    toHTML['services'] = paginator.page(page)
    toHTML['globalPartners'] = GlobalPartner.objects.all().order_by('-id')
    return render(request, 'home/landing.html', toHTML)
    

def serviceView(request):
    id = request.GET.get('id', None)

    toHTML = {}
    print("here------------------")

    if id or id != None:
        service_data = Service.objects.get(id = id)
        toHTML['service'] = service_data
        return render(request, 'home/about.html', toHTML)
    

