from .tradable_base import TradableBase,TradableManager
import app.utils.math_funcs as math_funcs

class StrategyBase(TradableBase):
    def __init__(self, name, start_date, ccy):
        TradableBase.__init__(self, name, ccy)

        #properties apply for real strategy
        self.children_strategies = {}
        self.start_date = start_date

    def get_properties(self):
        properties = TradableBase.get_properties(self)
        properties['start_date'] = self.start_date
        return properties

    def to_json(self, start_end_date=None):
        data = TradableBase.to_json(self, start_end_date=start_end_date)
        data["children_strategies"] = self.children_strategies
        return data

    def get_portfolio(self):
        portfolios = [math_funcs.apply_f_on_dict(
            TradableManager.get_tradable_by_name(child_strategy).get_portfolio(),
            lambda x: x * qty
        ) for child_strategy, qty in self.children_strategies.items()]
        portfolio = math_funcs.add_dicts(portfolios)
        return portfolio

    def is_strategy(self):
        return True