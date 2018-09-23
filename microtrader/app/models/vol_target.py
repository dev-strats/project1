from .strategy_base import StrategyBase
from .tradable_base import TradableManager
from ..utils import math_funcs,date_funcs
import math
import pandas as pd

class VolTarget(StrategyBase):
    def __init__(self,
        name,
        underlying_strategy_name,
        cap,
        target,
        start_date):

        StrategyBase.__init__(self,name,start_date)

        # calc initial ratio
        init_ratio = min(cap,1)
        underlying_strategy = TradableManager.get_tradable_by_name(underlying_strategy_name)
        underlying_price = underlying_strategy.get_values(start_date,start_date)[start_date]
        self.children_strategies[underlying_strategy_name] = init_ratio/underlying_price
        self.children_strategies[underlying_strategy.ccy] = 1-init_ratio
        self.param_data['underlying_strategy_name'] = underlying_strategy_name
        self.param_data['target'] = target
        self.param_data['beta'] = 0.8 # think how to set this.
        self.param_data['cap'] = cap

    def get_values(self,start_date,end_date):
        if start_date < self.start_date:
            raise Exception("strategy not yet started " + str(start_date))

        underlying_strategy = TradableManager.get_tradable_by_name(self.param_data['underlying_strategy_name'])
        underlying_prices = underlying_strategy.get_values(self.start_date,end_date)
        realized_variance = math_funcs.realized_variance_exp_decay(underlying_prices,self.param_data["beta"],self.param_data["target"],self.start_date)
        cap = self.param_data['cap']
        target = self.param_data['target']
        lev = min(cap,1)
        values = [1]
        value = 1
        libor = 0 #fix this

        realized_variance_pre = 0
        underlying_price_pre = None
        date_pre = None
        for date in realized_variance.index:
            if date == realized_variance.index[0]:
                realized_variance_pre = realized_variance[date]
                underlying_price_pre = underlying_prices[date]
                date_pre = date
                continue
            else:
                value *= (1+lev*(underlying_prices[date]/underlying_price_pre - 1) +
                          (1-lev)*libor*date_funcs.calc_time(date_pre, date))
                lev = min(cap, target/math.sqrt(realized_variance_pre))
                realized_variance_pre = realized_variance[date]
                values.append(value)

        self.values = pd.Series(values,index=realized_variance.index)
        pd_series = self.values[start_date:end_date]
        return pd_series



