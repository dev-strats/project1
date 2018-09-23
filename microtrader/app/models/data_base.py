from .tradable_base import TradableBase

class DataBase(TradableBase): # this is the data object, a special type of tradable.. not the database..
    def __init__(self, ticker, ticker_type):
        # ticker_type is like RIC or BLOOMBERG TICKER or similar, it is different to data source
        # in theory this is to ensure no ambiguition if RIC and BLOOMBERG TICKER coincides for different objects.
        # however this should also be generalized to the case of datasource differences. but a subtle difference
        # is the different datasource of the same ticker still mean the same underlying tradable
        # while the different ticker type of the same ticker might refer to two different underlying tradables..
        # it might be too complicated to introduce the datasource difference at the model level
        # so the ticker_type here might also refer to datasource.
        TradableBase.__init__(self, ticker_type+"_"+ticker)
        self.ticker = ticker
        self.ticker_type = ticker_type

    def get_properties(self):
        properties = TradableBase.get_properties(self)
        properties['ticker'] = self.ticker
        properties['ticker_type'] = self.ticker_type
        return properties

    def get_values(self,start_date,end_date):
        # this should call some standard API for database queries
        return None
