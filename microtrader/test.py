import pandas as pd
from app.models.rolling_future_strategy import RollingFutureStrategy
from app.models.strategy_short_vxx import StrategyShortVXX
from app.models.vol_target import VolTarget
from app.models.cash import Cash
from app.models.tradable_base import TradableManager
from app.utils import converter, math_funcs
from app.optimizers import simple_optimizer
from app.randomizers import market_data_randomizer
from app.datasource import quandl_wrapper

TradableManager.load_strategies()
strategyObj = TradableManager.get_tradable_by_name("Strategy_Short_VXX_001")
startDate = pd.to_datetime("2009-01-30")
endDate = pd.to_datetime("2019-01-30")
paramsSpace = {"open_threshold": (10,30), "close_threshold":(10,30)}
fixParams = {"max_vxx_incr_days":3}
initialParams = {"open_threshold": 25, "close_threshold":15}

# test optimizer

# res = simple_optimizer.return_optimizer_with_constraint(
#     strategyObj,
#     startDate,
#     endDate,
#     paramsSpace = paramsSpace, # dictionary with key being param, and value being the range of the param..
#     initialParams = initialParams,
#     fixParams = fixParams,
#     maxDrawDownLimit = None,
#     volLimit = None
# )

# now set to randomized mkt data

# market_data_randomizer.set_deterministic_mode(False)
# quandl_wrapper.set_data_disturbance_vol(0.02)
# res1 = strategyObj.get_values(startDate, endDate)
# res1 = simple_optimizer.return_optimizer_with_constraint(
#     strategyObj,
#     startDate,
#     endDate,
#     paramsSpace = paramsSpace, # dictionary with key being param, and value being the range of the param..
#     initialParams = initialParams,
#     fixParams = fixParams,
#     maxDrawDownLimit = None,
#     volLimit = None,
#     mc_paths = 10
# )
# print('res', res)
# print('res1', res1)
# # initialize basic data
# usd = Cash("USD")
#
# start_date = pd.to_datetime('2018-01-01')
# end_date = pd.to_datetime('2018-08-31')
# rf = RollingFutureStrategy("Rolling Future 001", "ES", "QUANDL", "CME/ESH2013", start_date)
# result = rf.get_values(start_date,end_date)
# # print(rf.to_json())
# # print(rf.get_portfolio())
#
# vt = VolTarget("Vol Target on Rolling Future 001", "Rolling Future 001", 0.8, 0.2, start_date)
# vt.get_values(pd.to_datetime(start_date),pd.to_datetime(end_date))
# print(vt.to_json())
# # result = converter.covert_price_to_gdata(result)
#
# # print(TradableManager.get_all_tradable_names_by_types())
# # cash = Cash("USD")
# # result = cash.get_values(start_date,end_date)
# # print (cash.to_json())


res = strategyObj.get_values(startDate, endDate)
StrategyShortVXX('Strategy_Short_VXX_002', 'USD', pd.to_datetime('2009-01-30'), pd.to_datetime('2019-01-30'),
                 open_threshold = 23,
                 close_threshold = 17,
                 max_vxx_incr_days = 2,
                 exec_prob = 'uniform',
                 exec_threshold = 0.0
)

strategyObj1 = TradableManager.get_tradable_by_name("Strategy_Short_VXX_002")
strategyObj1.get_values(startDate, endDate)
math_funcs.save_strategies_values_to_csv_file([strategyObj, strategyObj1],r'c:\Temp\test2.csv' )
# strategyObj.save_values_to_csv_file(r'c:\Temp\test.csv')
