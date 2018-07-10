from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from hello.models import City
from hello.models import Rolling_Future_Strategy
from hello.serializers import CitySerializer, StrategySerializer, PHPRowsSerializer

import json
import pdb
import datetime

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
        dummy_rolling_futures = [Rolling_Future_Strategy("Rolling Future 001", "ES", "QUANDL","CME/ESH2013")]
        dummy_rolling_futures[0].get_values(start_date,end_date)
        serializer = StrategySerializer(dummy_rolling_futures, many=True)
        return JsonResponse(serializer.data, safe=False)

def all_strategies_raw():
    data = [Rolling_Future_Strategy("Rolling Future 001", "ES", "QUANDL","CME/ESH2017", "2017-03-01")]
    hacky = data[0].get_param_data()
    hacky["id"] = 1
    return data

def all_strategies(request):
    if request.method == "GET":
        # currently only have the rolling_futures.
        # this call doesn't need to evaluate the value,
        data = all_strategies_raw()
        data1 = [x.get_param_data() for x in data]
        #serializer = StrategySerializer(data, many=True)
        #return JsonResponse(serializer.data, safe=False)
        return JsonResponse(data1,safe = False)

def strategy_by_id(request,id):
    if request.method == "GET":
        data = all_strategies_raw()
        idx = int(id) - 1
        param_data = data[idx].get_param_data()

        # format to match the front end app:
        # these 5 fields are common across strategies.
        output = dict(
            id = id,
            name = param_data["name"],
            type = param_data["type"],
            ccy = param_data["ccy"],
            start_date = param_data["start_date"]
        )

        output["parameters"] = {
            k: param_data[k] for k in param_data if k not in ["name", "type", "ccy", "start_date", "id"]
        }

        today = datetime.datetime.today()
        output["time_series"] = data[idx].get_values(param_data["start_date"],today)

        return JsonResponse(output,safe = False)

def strategy_type_params(request,type):
    if request.method == "GET":
        types = all_strategies_field_raw("type")
        type_id = types.index(type)+1
        output = dict(
            type_id = type_id,
            data = [] #need to fill in, leave empty for now
        )

        return JsonResponse(output, safe = False)


def php_column(datalist):
    data = [{"name": item, "id": k+1} for (item, k) in zip(datalist, range(len(datalist)))]
    serializer = PHPRowsSerializer(data, many=True)
    return JsonResponse(serializer.data, safe=False)

def all_strategies_field_raw(field):
    # currently only have the rolling_futures.
    # this call doesn't need to evaluate the value,
    data = all_strategies_raw()
    data = [item.get_param_data()[field] for item in data]
    dataset = set(data)
    data = list(dataset)
    data.sort()
    return data

def all_strategies_field(request, field):
    if request.method == "GET":
        data = all_strategies_field_raw(field)
        return php_column(data)