import pandas as pd
import datetime
from .data_base import DataBase
from app.datasource import quandl_wrapper as qw

class IndexProduct(DataBase):
    def __init__(self, ticker, ticker_type):
        # ccy should be implied..for now use USD. fix this.
        DataBase.__init__(self, ticker, ticker_type, "USD")

    def __getitem__(self, date):
        return self.values[date]

    def get_values(self, start_date, end_date):
        ret = qw.query_data(self.ticker, self.ticker_type, start_date, end_date)
        self.values = ret
        return ret