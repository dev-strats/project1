from .strategy_base import StrategyBase
from .tradable_base import TradableManager
from ..utils import math_funcs
import pandas as pd
import math

class AssetAllocationInverseVol(StrategyBase):
    def __init__(self, name, ccy, start_date, **kwargs):
        StrategyBase.__init__(self, name, ccy, start_date)
        self.update(**kwargs)

    def update(self, **kwargs):
        beta = kwargs["beta"]
        initial_vol = kwargs["initial_vol"]
        initial_weights = kwargs["initial_weights"]
        if "start_date" in kwargs:
            self.start_date = pd.to_datetime(kwargs["start_date"])

        total_initial_weights = sum(initial_weights.values())
        initial_weights = {k:initial_weights[k]/total_initial_weights for k in initial_weights}

        self.param_data["initial_weights"] = initial_weights
        self.param_data["beta"] = beta
        self.param_data["initial_vol"] = initial_vol

    def get_values(self,start_date,end_date):
        # need to calculate the state up to the state of start_date.
        # need to set the rebalance date/frequency as param - for now use daily.

        underlying_strategies = self.param_data["initial_weights"].keys()
        underlying_prices = {k:TradableManager.get_tradable_by_name(k).get_values(self.start_date,end_date) for k in underlying_strategies}
        realized_variances = {k:math_funcs.realized_variance_exp_decay(underlying_prices[k],self.param_data["beta"],self.param_data["initial_vol"],self.start_date) for k in underlying_prices}

        value = 1
        ret_values = []
        current_weights = {i:self.param_data["initial_weights"][i] for i in underlying_strategies}
        bdays = pd.bdate_range(self.start_date,end_date) # again, should use a standard API to get the business days for this strategy between start and end date
        bdays1 = []
        for date_iter in bdays:
            if date_iter > self.start_date:
                if date_iter > bdays[0]:
                    value += sum([current_weights[k] * (underlying_prices[k][date_iter-5:date_iter][-1]/underlying_prices[k][date_iter-6:date_iter-1][-1]-1) for k in underlying_strategies])
                    weights_this_time = {k:1/math.sqrt(realized_variances[k][date_iter-5:date_iter][-1]) for k in underlying_strategies}
                    current_weights = {k:weights_this_time[k]/sum(weights_this_time.values()) for k in underlying_strategies}

            if date_iter>= start_date:
                ret_values.append(value)
                bdays1.append(date_iter)
        self.values = pd.Series(ret_values, index=bdays1)
        self.children_strategies = {k:current_weights[k]/underlying_prices[k][-1] for k in underlying_strategies}
        return self.values

