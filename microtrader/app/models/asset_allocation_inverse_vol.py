from .strategy_base import StrategyBase
from .tradable_base import TradableManager
from ..utils import math_funcs,date_funcs
import math
import pandas as pd

class AssetAllocation(StrategyBase):
    def __init__(self, name, ccy, start_date, **kwargs):
        StrategyBase.__init__(self, name, ccy, start_date)
        self.update(**kwargs)

    def update(self, **kwargs):
        beta = kwargs["beta"]
        underlying_strategy_names = kwargs["underlying_strategies"]
        initial_weights = kwargs["initial_weights"]
        if "start_date" in kwargs:
            self.start_date = pd.to_datetime(kwargs["start_date"])

        start_date = self.start_date
        underlying_strategies = [TradableManager.get_tradable_by_name(x) for x in underlying_strategy_names]
        total_initial_weights = sum(initial_weights)
        initial_weights = [x/total_initial_weights for x in initial_weights]
        initial_ratios = [initial_weights[i]/underlying_strategies[i].get_values(start_date,start_date)[0] for i in range(len(initial_weights))]

        self.param_data["initial_ratios"] = {underlying_strategy_names[i]:initial_ratios[i] for i in range(len(initial_weights))}
        self.param_data["beta"] = beta

    def get_values(self,start_date,end_date):
        # need to calculate the state up to the state of start_date.
        # need to set the rebalance date/frequency as param - for now use daily.
        return None

