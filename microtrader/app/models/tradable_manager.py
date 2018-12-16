import os
import json
import pandas as pd

tradable_cache = {}

class TradableManager():
    def __init__(self):
        pass

    @staticmethod
    def load_strategy_definitions():
        # this can probably be done dynamicly...
        # this doesn't load the real positions but it loads the dummy examples of each strategies - which should be light
        # the purpose is to provide the interface to front-end
        from .rolling_future_strategy import RollingFutureStrategy
        from .vol_target import VolTarget

        RollingFutureStrategy("dummyRollingFutureStrategy","","","",None)
        VolTarget("dummyVolTarget","dummyRollingFutureStrategy",0,0,None)

    @staticmethod
    def load_strategies():
        # this is the placeholder where we load real stragtegies in the book
        # for now, we hard-coded some examples:
        # a dummy function to return some tradables
        # this will be replaced by proper load of real positions

        from .rolling_future_strategy import RollingFutureStrategy
        from .vol_target import VolTarget
        from .cash import Cash

        RollingFutureStrategy("Rolling_Future_001", "USD", pd.to_datetime("2013-04-15"), ticker_root = "ES", ticker_type = "QUANDL", initial_contract = "CME/ESM2013" )
        VolTarget("Vol_Target_on_Rolling_Future_001", "USD", pd.to_datetime("2013-04-15"), underlying_strategy_name = "Rolling_Future_001", cap = 0.8, target = 0.2, beta=0.8)
        Cash("USD")

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

    @staticmethod
    def get_all_tradable_names():
        return list(tradable_cache.keys())

    @staticmethod
    def get_all_tradable_names_by_types():
        ret = {}
        for tradable_name in tradable_cache:
            temp = {tradable_cache[tradable_name].type:{tradable_name:None}}
            ret = {**temp,**ret}
        return ret

    @staticmethod
    def get_all_strategy_names_by_types():
        ret = {}
        for tradable_name in tradable_cache:
            if tradable_cache[tradable_name].is_strategy():
                temp = {tradable_cache[tradable_name].type:{tradable_name:None}}
                ret = {**temp,**ret}
        return ret

    @staticmethod
    def get_all_strategy_types():
        all_strategies = TradableManager.get_all_strategy_names_by_types()
        return list(all_strategies.keys())

    @staticmethod
    def get_all_strategy_names_by_type(type_name):
        all_strategies = TradableManager.get_all_strategy_names_by_types()
        return list(all_strategies[type_name].keys())

    def get_strategy_param_data(strategy_name):
        strategy = TradableManager.get_tradable_by_name(strategy_name)
        return strategy.get_param_data()

