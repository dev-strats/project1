import pandas as pd
import datetime
from ..randomizers.execution_randomizer import ExecutionRandomizer
from .strategy_base import StrategyBase
from .tradable_base import TradableManager

class StrategyShortVXX(StrategyBase):
    def update(self, **kwargs):
        if 'start_date' in kwargs:
            self.start_date = pd.to_datetime(kwargs['start_date'])

        if 'end_date' in kwargs:
            self.end_date = pd.to_datetime(kwargs['end_date'])

        for key, value in kwargs.items():
            if key != 'start_date' and key != 'end_date':
                self.param_data[key] = value 

        self.exec_randomizer = ExecutionRandomizer(
            prob = kwargs['exec_prob'] if 'exec_prob' in kwargs else None,
            threshold = kwargs['exec_threshold'] if 'exec_threshold' in kwargs else None,
            seed = kwargs['seed'] if 'seed' in kwargs else None,
        )

    def __init__(self, name, ccy, start_date, end_date, **kwargs):
        StrategyBase.__init__(self, name, ccy, start_date, end_date)
        self.update(**kwargs)

    def get_values(self, start_date, end_date):
        if start_date < self.start_date:
            raise Exception("strategy not yet started " + str(start_date))

        vix_data = TradableManager.get_tradable_by_name('YAHOO_VIX').get_values(self.start_date, self.end_date)
        vxx_data = TradableManager.get_tradable_by_name('YAHOO_VXX').get_values(self.start_date, self.end_date)

        # bdays = pd.bdate_range(start_date, end_date) # use standard API to get business days
        bdays = vxx_data.index
        print('Start Date: ' + bdays[0].strftime("%Y-%m-%d"))
        print('End Date:   ' + bdays[-1].strftime("%Y-%m-%d"))

        value = 100.0
        values = []
        position = 0
        prev_price = None
        vxx_incr_cnt = 0

        for date_iter in bdays:
            date = date_iter.strftime("%Y-%m-%d")
            if position == 0 and vix_data[date] >= self.param_data['open_threshold'] and self.exec_randomizer.check():
                position = - value / vxx_data[date] # Open short position
                vxx_incr_cnt = 0
                
            elif position < 0:
                value += (vxx_data[date] - prev_price) * position

                if vxx_data[date] > prev_price:
                    vxx_incr_cnt += 1
                else:
                    vxx_incr_cnt = 0
                    
                if vix_data[date] <= self.param_data['close_threshold'] or vxx_incr_cnt >= self.param_data['max_vxx_incr_days']:
                    position = 0 # Close short position
            
            values.append(value)
            prev_price = vxx_data[date]

            if date_iter <= end_date:
                self.children_strategies = {"YAHOO_VXX": position, "USD": value - vxx_data[date]*position}

        self.values = pd.Series(values, index=bdays)[start_date : end_date]
        return self.values