from rest_framework import serializers
from hello.models import City


class CitySerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    population = serializers.IntegerField(required=False)

class StrategySerializer(serializers.Serializer):
    children_strategies = serializers.DictField()
    param_data = serializers.DictField()
    values = serializers.CharField(allow_blank=True,max_length = 40000)

class PHPRowsSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    name = serializers.CharField(allow_blank=True,max_length = 1000)




