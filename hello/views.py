from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from hello.models import City
from hello.models import Rolling_Future_Strategy
from hello.serializers import CitySerializer, StrategySerializer

import json
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def cities(request):
    """
    List all cities
    """
    if request.method == 'GET':
        cities = [City('Beijing', 200), City('Shanghai', 100)]
        serializer = CitySerializer(cities, many=True)
        return JsonResponse(serializer.data, safe=False)

def rolling_futures(request, start_date, end_date):
    """
    Dummy one
    """
    if request.method == 'GET':
        dummy_rolling_futures = [Rolling_Future_Strategy("ES", "QUANDL","CME/ESH2013")]
        dummy_rolling_futures[0].get_values(start_date,end_date)
        serializer = StrategySerializer(dummy_rolling_futures, many=True)
        return JsonResponse(serializer.data, safe=False)
