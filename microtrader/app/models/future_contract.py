import pandas as pd
import datetime
from .data_base import DataBase
from app.datasource import quandl_wrapper as qw

class FutureContract(DataBase):
    def __init__(self, ticker, ticker_type):
        # ccy should be implied..for now use USD. fix this.
        DataBase.__init__(self, ticker, ticker_type, "USD")
        # the blow should be calling some standard API to query database to get future dates data.
        self.param_data["expiration_date"] = None
        self.param_data["last_trading_date"] = None
        self.param_data["roll_date"] = None
        self.param_data["month_letters"] = "HMUZ"

        # a fake roll date:
        contract_month_pos = -5 # conventions like U8 means U2018, or U2018
        month = 3*( self.param_data["month_letters"].index(self.ticker[contract_month_pos]) + 1 )
        day = 6
        # year = int(self.ticker[-1]) + 2010
        year = int(self.ticker[-4:-1]+self.ticker[-1])
        self.param_data["roll_date"] = pd.to_datetime(str(year) +"-"+str(month)+"-"+str(day))
        # find the first biz day
        self.param_data["roll_date"] = pd.bdate_range(self.param_data["roll_date"],self.param_data["roll_date"]+datetime.timedelta(days=5))[0]
        # end of the fake roll date


    def get_next(self):
        contract_month_pos = -5
        pos = self.param_data["month_letters"].index(self.ticker[contract_month_pos])
        year = int(self.ticker[-4:-1]+self.ticker[-1])
        if pos == len(self.param_data["month_letters"])-1:
            pos = -1
            year += 1

        new_ticker = self.ticker[:contract_month_pos] + self.param_data["month_letters"][pos+1] + str(year)
        ret = FutureContract(new_ticker, self.ticker_type)
        return ret

    def get_values(self, start_date, end_date):
        ret = qw.query_data(self.ticker, self.ticker_type, start_date, end_date)
        self.values = ret
        return ret