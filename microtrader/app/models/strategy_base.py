from .tradable_base import TradableBase

class StrategyBase(TradableBase):
    def __init__(self, name, start_date):
        TradableBase.__init__(self,name)

        #properties apply for real strategy
        self.children_strategies = {}
        self.start_date = start_date

    def get_properties(self):
        properties = TradableBase.get_properties(self)
        properties['start_date'] = self.start_date
        return properties

    def to_json(self):
        data = TradableBase.to_json(self)
        data["children_strategies"] = self.children_strategies
        return data