import pandas as pd
import datetime
from .strategy_base import StrategyBase
from .future_contract import FutureContract

class RollingFutureStrategy(StrategyBase):
    def update(self, **kwargs):
        # ccy should be implied, fix this.
        ticker_root = kwargs["ticker_root"]
        ticker_type = kwargs["ticker_type"]
        initial_contract = kwargs["initial_contract"]

        self.param_data["ticker_root"] = ticker_root
        self.param_data["ticker_type"] = ticker_type
        self.param_data["initial_contract"] = initial_contract

        if "start_date" in kwargs:
            self.start_date = pd.to_datetime(kwargs["start_date"])

    def __init__(self, name, ccy, start_date, **kwargs):
        StrategyBase.__init__(self, name, ccy, start_date)
        self.update(**kwargs)

    def get_values(self,start_date,end_date):
        # 1. get the contract series - the data is expected to live in database ( for different future, the contract months list should be saved in database).
        init_contract = self.param_data["initial_contract"]
        contract_obj = FutureContract(init_contract, self.param_data["ticker_type"])
        init_ratio = 1/contract_obj.get_values(self.start_date,self.start_date)[0]
        current_ratio = init_ratio
        # roll all things before the start date
        while contract_obj.param_data["roll_date"] <= start_date:
            next_contract = contract_obj.get_next()
            roll_date = contract_obj.param_data["roll_date"]
            current_ratio *= contract_obj.get_values(roll_date,roll_date)[0]/next_contract.get_values(roll_date,roll_date)[0]
            contract_obj = next_contract

        # now on the start date, the contract is up to date.
        bdays = pd.bdate_range(start_date,end_date) # again, should use a standard API to get the business days for this strategy between start and end date
        ret_values = []
        for date_iter in bdays:
            if contract_obj.param_data["roll_date"] == date_iter:
                next_contract = contract_obj.get_next()
                roll_date = contract_obj.param_data["roll_date"]
                current_ratio *= contract_obj.get_values(roll_date,roll_date)[0]/next_contract.get_values(roll_date,roll_date)[0]
                contract_obj = next_contract
            ret_values.append(current_ratio*contract_obj.get_values(date_iter,date_iter)[0])

        self.values = pd.Series(ret_values, index=bdays)
        self.children_strategies = {contract_obj.name : current_ratio}
        return self.values