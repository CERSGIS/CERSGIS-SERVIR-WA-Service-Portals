from rest_framework import serializers
from .models import PilotFootprintRegion

class footprintRegionSerializer(serializers.ModelSerializer):
    class Meta:

        model = PilotFootprintRegion
        exclude = ['id']
