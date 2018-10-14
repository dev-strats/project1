import pandas as pd
import os
import json
import app.utils.math_funcs as math_funcs

tradable_cache = {}

class TradableManager():
    def __init__(self):
        pass

    @staticmethod
    def get_tradable_by_name(name):
        if name not in tradable_cache:
            raise Exception(name + " not initialized")
        return tradable_cache[name]

    @staticmethod
    def register_tradable_by_name(name, obj):
        global tradable_cache
        tradable_cache[name] = obj

    @staticmethod
    def get_tradable_by_file(file_name):
        if os.path.isfile(file_name):
            with open(file_name) as in_file:
                data = json.load(in_file)
                name = data["name"]
                if name in tradable_cache:
                    return TradableManager.get_tradable_by_name(name)
                else:
                    # we need to initialize the class pragrammactically
                    return None
        else:
            raise Exception(file_name+" not exists")

class TradableBase():
    def __init__(self, name, ccy):

        #standard properties
        self.name = name
        self.type = self.__class__.__name__
        self.ccy = ccy

        #flexible parameters
        self.param_data = {}

        #time series
        self.values = pd.Series()

        # register in strategy manager
        TradableManager.register_tradable_by_name(name,self)

    def get_properties(self):
        return {
            'name': self.name,
            'type': self.type,
            'ccy' : self.ccy
        }

    def get_param_data(self):
        return self.param_data

    def get_values(self,start_date,end_date):
        return None

    def get_values_stats(self,start_date,end_date):
        ret = math_funcs.get_return(self.values,start_date,end_date)
        vol = math_funcs.get_vol(self.values,start_date,end_date)
        max_draw_down = math_funcs.get_max_draw_down(self.values,start_date,end_date)
        sharpe_ratio = ret / vol

        return {
            "return":   ret,
            "volatility":   vol,
            "max_draw_down": max_draw_down,
            "sharpe_ratio": sharpe_ratio
        }

    def get_values_all_stats(self):
        start_date = self.values.index[0]
        end_date = self.values.index[-1]
        return self.get_values_stats(start_date,end_date)

    def get_values_json(self,start_date,end_date):
        values = self.get_values(start_date,end_date)
        return [[x.to_pydatetime().strftime("%Y-%m-%d"),y] for (x,y) in zip(values.index.tolist(), values.tolist())]

    def get_values_json_all(self):
        return [[x.to_pydatetime().strftime("%Y-%m-%d"),y] for (x,y) in zip(self.values.index.tolist(), self.values.tolist())]

    def to_json(self):
        return {
                    "properties"    : self.get_properties(),
                    "param_data"    : self.get_param_data(),
                    "values"        : self.get_values_json_all(),
                    "stats"         : self.get_values_all_stats(),
                }

    def save_to_file(self):
        file_name = os.curdir+"\\storage\\"+self.name+".json"
        with open(file_name,"w") as out_file:
            json.dump(self.to_json(),out_file)

    def load_from_file(self):
        file_name = os.curdir+"\\storage\\"+self.name+".json"

        if os.path.isfile(file_name):
            with open(file_name) as in_file:
                data = json.load(in_file)

                # we check the major properties not change.
                if self.name != data['name']:
                    raise Exception("name conflict " + self.name + " : " + data['name'])

                if self.type != data['type']:
                    raise  Exception("type conflict " + self.type + " : " + data["type"])

                self.ccy = data["ccy"]
                self.param_data = data["param_data"]
                self.values = pd.Series([x[1] for x in data["values"]],index=[pd.to_datetime(x[0]) for x in data["values"]])
        else:
            raise Exception(file_name+" not exists")
