from .tradable_base import TradableBase,TradableManager
import app.utils.math_funcs as math_funcs

class StrategyBase(TradableBase):
    def __init__(self, name, ccy, start_date):
        TradableBase.__init__(self, name, ccy)

        #properties apply for real strategy
        self.children_strategies = {}
        self.start_date = start_date

    def get_param_data(self):
        param_data = TradableBase.get_param_data(self)
        param_data['start_date'] = self.start_date
        return param_data

    def get_param_data_json(self):
        param_data = TradableBase.get_param_data(self)
        param_data['start_date'] = self.start_date.to_pydatetime().strftime("%Y-%m-%d")
        return param_data

    def to_json(self, from_to_date=None):
        data = TradableBase.to_json(self, from_to_date=from_to_date)
        children_strategies = self.children_strategies
        real_strategies = {}
        real_data = {}
        for strategy_name in children_strategies:
            strategy = TradableManager.get_tradable_by_name(strategy_name)
            if strategy.is_strategy():
                real_strategies[strategy_name] = children_strategies[strategy_name]
            else:
                real_data[strategy_name] = children_strategies[strategy_name]

        data["children_strategies"] = {"children_strategies": real_strategies, "children_data": real_data}
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