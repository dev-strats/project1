import pandas as pd
import datetime
from .data_base import DataBase

class FutureContract(DataBase):
    def __init__(self, ticker, ticker_type):
        DataBase.__init__(self, ticker, ticker_type)
        # the blow should be calling some standard API to query database to get future dates data.
        self.param_data["expiration date"] = None
        self.param_data["last trading date"] = None
        self.param_data["roll date"] = None
        self.param_data["month letters"] = "HMUZ"

        # a fake roll date:
        contract_month_pos = -5 # conventions like U8 means U2018, or U2018
        month = 3*( self.param_data["month letters"].index(self.ticker[contract_month_pos]) + 1 )
        day = 6
        # year = int(self.ticker[-1]) + 2010
        year = int(self.ticker[-4:-1]+self.ticker[-1])
        self.param_data["roll date"] = pd.to_datetime(str(year) +"-"+str(month)+"-"+str(day))
        # find the first biz day
        self.param_data["roll date"] = pd.bdate_range(self.param_data["roll date"],self.param_data["roll date"]+datetime.timedelta(days=5))[0]
        # end of the fake roll date


    def get_next(self):
        contract_month_pos = -5
        pos = self.param_data["month letters"].index(self.ticker[contract_month_pos])
        year = int(self.ticker[-4:-1]+self.ticker[-1])
        if pos == len(self.param_data["month letters"])-1:
            pos = -1
            year += 1

        new_ticker = self.ticker[:contract_month_pos] + self.param_data["month letters"][pos+1] + str(year)
        ret = FutureContract(new_ticker, self.ticker_type)
        return ret
