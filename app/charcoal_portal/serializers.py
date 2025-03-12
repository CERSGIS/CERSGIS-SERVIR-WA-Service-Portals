from rest_framework import serializers
from .models import CharcoalRegion

class charcoalRegionsSerializer(serializers.ModelSerializer):
    class Meta:

        model = CharcoalRegion
        exclude = ['id']
