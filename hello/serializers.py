from rest_framework import serializers
from hello.models import City


class CitySerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    population = serializers.IntegerField(required=False)