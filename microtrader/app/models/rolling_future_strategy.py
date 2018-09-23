import pandas as pd
import datetime
from .strategy_base import StrategyBase
from .future_contract import FutureContract
from app.datasource import quandl_wrapper as qw

class RollingFutureStrategy(StrategyBase):
    def __init__(self, name, ticker_root, ticker_type, initial_contract, start_date):
        StrategyBase.__init__(self, name, start_date)
        self.ccy = "USD" # a value should be inferred but for now a hard-coded

        self.param_data["ticker root"] = ticker_root
        self.param_data["ticker type"] = ticker_type
        self.param_data["initial contract"] = initial_contract

    def get_values(self,start_date,end_date):
        # 1. get the contract series - the data is expected to live in database ( for different future, the contract months list should be saved in database).
        init_contract = self.param_data["initial contract"]
        contract_obj = FutureContract(init_contract, self.param_data["ticker type"])
        roll_fees = 0
        # roll all things before the start date
        while contract_obj.param_data["roll date"] <= start_date:
            next_contract = contract_obj.get_next()
            roll_date = contract_obj.param_data["roll date"]
            old_c_price = qw.query_data(contract_obj.ticker, contract_obj.ticker_type, roll_date, roll_date)[0]
            new_c_price = qw.query_data(next_contract.ticker, next_contract.ticker_type, roll_date, roll_date)[0]
            price_diff = old_c_price - new_c_price
            roll_fees += price_diff
            contract_obj = next_contract

        # now on the start date, the contract is up to date.
        bdays = pd.bdate_range(start_date,end_date) # again, should use a standard API to get the business days for this strategy between start and end date
        ret_values = []
        for date_iter in bdays:
            if contract_obj.param_data["roll date"] == date_iter:
                next_contract = contract_obj.get_next()
                roll_date = contract_obj.param_data["roll date"]
                price_diff = qw.query_data(contract_obj.ticker, contract_obj.ticker_type, roll_date, roll_date)[0]\
                             - qw.query_data(next_contract.ticker, next_contract.ticker_type, roll_date, roll_date)[0]
                roll_fees += price_diff
                contract_obj = next_contract

            ret_values.append(roll_fees + qw.query_data(contract_obj.ticker, contract_obj.ticker_type,date_iter,date_iter)[0])

        self.children_strategies[contract_obj.ticker] = 1
        self.values =  pd.Series(ret_values,index=bdays)
        return self.values