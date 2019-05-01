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
        from .strategy_short_vxx import StrategyShortVXX

        # RollingFutureStrategy("dummyRollingFutureStrategy","","","",None)
        # VolTarget("dummyVolTarget","dummyRollingFutureStrategy",0,0,None)
        # AssetAllocationInverseVol("dummyAssetAllocationInverseVol",)

    @staticmethod
    def load_strategies():
        # this is the placeholder where we load real stragtegies in the book
        # for now, we hard-coded some examples:
        # a dummy function to return some tradables
        # this will be replaced by proper load of real positions

        from .index_product import IndexProduct
        from .etf_product import EtfProduct

        IndexProduct('VIX', 'YAHOO')
        EtfProduct('VXX', 'YAHOO')

        from .rolling_future_strategy import RollingFutureStrategy
        from .vol_target import VolTarget
        from .cash import Cash
        from .asset_allocation_inverse_vol import AssetAllocationInverseVol
        from .strategy_short_vxx import StrategyShortVXX

        # RollingFutureStrategy("Rolling_Future_001", "USD", pd.to_datetime("2013-04-15"), ticker_root = "ES", ticker_type = "QUANDL", initial_contract = "CME/ESM2013" )
        # VolTarget("Vol_Target_on_Rolling_Future_001", "USD", pd.to_datetime("2013-04-15"), underlying_strategy_name = "Rolling_Future_001", cap = 0.8, target = 0.2, beta=0.8)
        # Cash("USD")
        # AssetAllocationInverseVol("Asset_Allocation_Inverse_Vol_001", "USD", pd.to_datetime("2013-04-15"),
        #                           initial_weights = {
        #                               "Rolling_Future_001":0.5,
        #                               "Vol_Target_on_Rolling_Future_001":0.5
        #                           },
        #                           initial_vol = 0.2,
        #                           beta = 0.8
        # )
        StrategyShortVXX('Strategy_Short_VXX_001', 'USD', pd.to_datetime('2009-01-30'), pd.to_datetime('2019-01-30'),
                         open_threshold = 25,
                         close_threshold = 15,
                         max_vxx_incr_days = 3,
                         exec_prob = 'uniform',
                         exec_threshold = 0.0
        )

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

    @staticmethod
    def get_strategy_param_data(strategy_name):
        strategy = TradableManager.get_tradable_by_name(strategy_name)
        return strategy.get_param_data()

