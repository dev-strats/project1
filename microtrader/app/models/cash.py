from .data_base import DataBase
import pandas as pd

class Cash(DataBase):
    def __init__(self,ticker):
        DataBase.__init__(self,ticker,"RIC") # we used reuters code for ccy.
        self.ccy = ticker

    def get_values(self,start_date,end_date):
        # we need to add discount
        # for now use flat
        bdates = pd.bdate_range(start_date,end_date)
        self.values = pd.Series([1 for i in range(len(bdates))],index=bdates)
        return self.values







