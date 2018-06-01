from django.db import models
import pandas as pd
import random
import datetime

# Create your models here.
class City:
    def __init__(self, name, population):
        self.name = name
        self.population = population

def dummy_db_query_func(ticker, ticker_type, start_date, end_date):
    bdays = pd.bdate_range(start=start_date, end=end_date)
    ret = pd.Series([random.randint(1,100) for i in range(len(bdays))], index=bdays)
    return ret

class Strategy_Base:
    def __init__(self):
        self.children_strategies = {}
        self.param_data = {}

    def get_values(self,start_date,end_date):
        return None

class Data_Base(Strategy_Base): # this is the data object, a special type of strategy.. not the database..
    def __init__(self, ticker, ticker_type):
        Strategy_Base.__init__(self)
        self.param_data["Ticker"] = ticker
        self.param_data["Ticker Type"] = ticker_type

    def get_values(self,start_date,end_date):
        # this should call the standard API
        # ret = some_API_query_database(self.param_data["Ticker"], self.param_data["Ticker Type"], start_date, end_date)

        # for now a dummy data
        return None

class Future(Data_Base):
    def __init__(self, ticker, ticker_type):
        Data_Base.__init__(self, ticker, ticker_type)
        # the blow should be calling some standard API to query database to get future dates data.
        self.param_data["Expiration Date"] = None
        self.param_data["Last Trading Date"] = None
        self.param_data["Roll Date"] = None
        self.param_data["Month Letters"] = "FGHJKMNQUVXZ"

        # a fake roll date:
        month = self.param_data["Month Letters"].index(self.param_data["Ticker"][-2]) + 1
        day = 19
        year = int(self.param_data["Ticker"][-1]) + 2010
        self.param_data["Roll Date"] = pd.to_datetime(str(year) +"-"+str(month)+"-"+str(day))
        # find the first biz day
        self.param_data["Roll Date"]=pd.bdate_range(self.param_data["Roll Date"],self.param_data["Roll Date"]+datetime.timedelta(days=5))[0]

        # end of the fake roll date


    def get_next(self):
        pos = self.param_data["Month Letters"].index(self.param_data["Ticker"][-2])
        year = int(self.param_data["Ticker"][-1])
        if pos == len(self.param_data["Month Letters"])-1:
            pos = -1
            year += 1
            if year == 10:
                year = 0

        new_ticker = self.param_data["Ticker"][:-2] + self.param_data["Month Letters"][pos+1] + str(year)
        ret = Future(new_ticker, self.param_data["Ticker Type"])
        return ret

class Rolling_Future_Strategy(Strategy_Base):
    def __init__(self, ticker_root, ticker_type, initial_contract, initial_date):
        Strategy_Base.__init__(self)
        self.param_data["Ticker Root"] = ticker_root
        self.param_data["Ticker Type"] = ticker_type
        self.param_data["Initial Contract"] = initial_contract
        self.param_data["Initial Date"] = initial_date

    def get_values(self,start_date,end_date):
        # start from the initial contract, and find out every rolls.

        # 1. get the contract series - the data is expected to live in database ( for different future, the contract months list should be saved in database).
        contract = self.param_data["Initial Contract"]
        contract_obj = Future(contract, self.param_data["Ticker Type"])
        roll_fees = 0
        # roll all things before the start date
        while contract_obj.param_data["Roll Date"] <= start_date:
            next_contract = contract_obj.get_next()
            roll_date = contract_obj.param_data["Roll Date"]
            price_diff = dummy_db_query_func(contract_obj.param_data["Ticker"], contract_obj.param_data["Ticker Type"], roll_date, roll_date)[0]\
                         - dummy_db_query_func(next_contract.param_data["Ticker"], next_contract.param_data["Ticker Type"], roll_date, roll_date)[0]
            roll_fees += price_diff
            contract_obj = next_contract

        # now on the start date, the contract is up to date.
        bdays = pd.bdate_range(start_date,end_date) # again, should use a standard API to get the business days for this strategy between start and end date
        ret_values = []
        for date_iter in bdays:
            if contract_obj.param_data["Roll Date"] == date_iter:
                next_contract = contract_obj.get_next()
                roll_date = contract_obj.param_data["Roll Date"]
                price_diff = dummy_db_query_func(contract_obj.param_data["Ticker"], contract_obj.param_data["Ticker Type"], roll_date, roll_date)[0]\
                             - dummy_db_query_func(next_contract.param_data["Ticker"], next_contract.param_data["Ticker Type"], roll_date, roll_date)[0]
                roll_fees += price_diff
                contract_obj = next_contract

            ret_values.append(roll_fees+dummy_db_query_func(contract_obj.param_data["Ticker"], contract_obj.param_data["Ticker Type"],date_iter,date_iter)[0])

        return pd.Series(ret_values,index=bdays)


## test code...

# print(dummy_db_query_func("ABC","Dummy", "2018-05-24", "2018-06-01"))
rf = Rolling_Future_Strategy("CL", "Ric", "CLH3", pd.to_datetime("2013-03-01"))
ret = rf.get_values(pd.to_datetime("2017-11-10"),pd.to_datetime("2018-03-05"))
print(ret)







