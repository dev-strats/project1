__author__ = 'ythtb_000'

import pandas as pd
import datetime
import database as db #used in the other version....
import json

# Create your models here.

class Strategy_Base():
    def __init__(self, name):
        self.children_strategies = {}
        self.param_data = {"name": name, "type": "Unknown", "ccy": "Unknown", "start_date": None}
        self.values = {}

    def get_values(self,start_date,end_date):
        return None

    def get_param_data(self):
        return self.param_data

    def to_json(self):
        return {"children_strategies":self.children_strategies,
                    "param_data":self.param_data,
                    "values":self.values
                    }

class Data_Base(Strategy_Base): # this is the data object, a special type of strategy.. not the database..
    def __init__(self, name, ticker, ticker_type):
        Strategy_Base.__init__(self, name)
        self.param_data["type"] = "Data"
        self.param_data["Ticker"] = ticker
        self.param_data["Ticker Type"] = ticker_type

    def get_values(self,start_date,end_date):
        # this should call the standard API
        # ret = some_API_query_database(self.param_data["Ticker"], self.param_data["Ticker Type"], start_date, end_date)

        # for now a dummy data
        return None

class Future(Data_Base):
    def __init__(self, name, ticker, ticker_type):
        Data_Base.__init__(self, name, ticker, ticker_type)
        # the blow should be calling some standard API to query database to get future dates data.
        self.param_data["Expiration Date"] = None
        self.param_data["Last Trading Date"] = None
        self.param_data["Roll Date"] = None
        self.param_data["Month Letters"] = "HMUZ"

        # a fake roll date:
        contract_month_pos = -5 # conventions like U8 means U2018, or U2018
        month = 3*( self.param_data["Month Letters"].index(self.param_data["Ticker"][contract_month_pos]) + 1 )
        day = 6
        # year = int(self.param_data["Ticker"][-1]) + 2010
        year = int(self.param_data["Ticker"][-4:-1]+self.param_data["Ticker"][-1])
        self.param_data["Roll Date"] = pd.to_datetime(str(year) +"-"+str(month)+"-"+str(day))
        # find the first biz day
        self.param_data["Roll Date"]=pd.bdate_range(self.param_data["Roll Date"],self.param_data["Roll Date"]+datetime.timedelta(days=5))[0]
        # end of the fake roll date


    def get_next(self):
        contract_month_pos = -5
        pos = self.param_data["Month Letters"].index(self.param_data["Ticker"][contract_month_pos])
        year = int(self.param_data["Ticker"][-4:-1]+self.param_data["Ticker"][-1])
        if pos == len(self.param_data["Month Letters"])-1:
            pos = -1
            year += 1

        new_ticker = self.param_data["Ticker"][:contract_month_pos] + self.param_data["Month Letters"][pos+1] + str(year)
        ret = Future(new_ticker, new_ticker, self.param_data["Ticker Type"])
        return ret


class Rolling_Future_Strategy(Strategy_Base):
    def __init__(self, name, ticker_root, ticker_type, initial_contract, start_date):
        Strategy_Base.__init__(self, name)
        self.param_data["type"] = "Rolling Future"
        self.param_data["Ticker Root"] = ticker_root
        self.param_data["Ticker Type"] = ticker_type
        self.param_data["Initial Contract"] = initial_contract
        self.param_data["ccy"] = "USD" # a value should be inferred but for now a hard-coded
        self.param_data["start_date"] = start_date # this is a str which pd can parse


    def get_values(self,start_date,end_date):
        # start from the initial contract, and find out every rolls.

        if isinstance(start_date,str):
            start_date = pd.to_datetime(start_date)

        if isinstance(end_date, str):
            end_date = pd.to_datetime(end_date)

        # 1. get the contract series - the data is expected to live in database ( for different future, the contract months list should be saved in database).
        contract = self.param_data["Initial Contract"]
        contract_obj = Future(contract, contract, self.param_data["Ticker Type"])
        roll_fees = 0
        # roll all things before the start date
        while contract_obj.param_data["Roll Date"] <= start_date:
            next_contract = contract_obj.get_next()
            roll_date = contract_obj.param_data["Roll Date"]
            old_c_price = db.db_query_func(contract_obj.param_data["Ticker"], contract_obj.param_data["Ticker Type"], roll_date, roll_date)[0]
            new_c_price = db.db_query_func(next_contract.param_data["Ticker"], next_contract.param_data["Ticker Type"], roll_date, roll_date)[0]
            price_diff = old_c_price - new_c_price
            roll_fees += price_diff
            contract_obj = next_contract

        # now on the start date, the contract is up to date.
        bdays = pd.bdate_range(start_date,end_date) # again, should use a standard API to get the business days for this strategy between start and end date
        ret_values = []
        for date_iter in bdays:
            if contract_obj.param_data["Roll Date"] == date_iter:
                next_contract = contract_obj.get_next()
                roll_date = contract_obj.param_data["Roll Date"]
                price_diff = db.db_query_func(contract_obj.param_data["Ticker"], contract_obj.param_data["Ticker Type"], roll_date, roll_date)[0]\
                             - db.db_query_func(next_contract.param_data["Ticker"], next_contract.param_data["Ticker Type"], roll_date, roll_date)[0]
                roll_fees += price_diff
                contract_obj = next_contract

            ret_values.append(roll_fees+db.db_query_func(contract_obj.param_data["Ticker"], contract_obj.param_data["Ticker Type"],date_iter,date_iter)[0])

        self.children_strategies["Current Future Contract"] = contract_obj.param_data["Ticker"]
        ret =  pd.Series(ret_values,index=bdays)
        # self.values = ret.to_json(date_format='iso')
        self.values = [[x.to_pydatetime().strftime("%Y-%m-%d"),y] for (x,y) in zip(ret.index.tolist(), ret.tolist())]
        return self.values


## test code...

# print(db.db_query_func("ABC","Dummy", "2018-05-24", "2018-06-01"))
# rf = Rolling_Future_Strategy("ES", "QUANDL", "CME/ESH2013")
# ret = rf.get_values(pd.to_datetime("2017-11-10"),pd.to_datetime("2018-03-05"))
# print(ret)
# print(rf.children_strategies)
# db.get_quandl_data("CME/ESU2018")
# print(pd.to_datetime("01Mar2013",infer_datetime_format=True))






