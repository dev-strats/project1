import os
import sys
sys.path.insert(0,os.path.abspath(os.path.join(os.path.join(os.path.join(os.path.abspath(__file__), os.pardir),os.pardir),os.pardir)))

import pandas as pd
from app.models.tradable_base import TradableManager
from app.optimizers import simple_optimizer
from app.randomizers import market_data_randomizer
from app.datasource import quandl_wrapper
import sys
sys.stdout = open(r'C:\Temp\optimizer_1.txt', "w")
print ("test sys.stdout")

TradableManager.load_strategies()
strategyObj = TradableManager.get_tradable_by_name("Strategy_Short_VXX_001")
startDate = pd.to_datetime("2009-01-30")
endDate = pd.to_datetime("2019-01-30")
paramsSpace = {"open_threshold": (10,30), "close_threshold":(10,30)}
fixParams = {"max_vxx_incr_days":3}
initialParams = {"open_threshold": 25, "close_threshold":15}

res = simple_optimizer.return_optimizer_with_constraint(
    strategyObj,
    startDate,
    endDate,
    paramsSpace = paramsSpace, # dictionary with key being param, and value being the range of the param..
    initialParams = initialParams,
    fixParams = fixParams,
    maxDrawDownLimit = None,
    volLimit = None,
    verbose = True,
    vary_start_date = True,
    start_date_freq_days = 30
)
print(res)
# strategyObj.save_values_to_csv_file(r'C:\Temp\test1.csv')

# now set to randomized mkt data

# market_data_randomizer.set_deterministic_mode(False)
# quandl_wrapper.set_data_disturbance_vol(0.02)
# res1 = simple_optimizer.return_optimizer_with_constraint(
#     strategyObj,
#     startDate,
#     endDate,
#     paramsSpace = paramsSpace, # dictionary with key being param, and value being the range of the param..
#     initialParams = initialParams,
#     fixParams = fixParams,
#     maxDrawDownLimit = None,
#     volLimit = None,
#     mc_paths = 10,
#     use_multi_process = False,
#     num_processes = 10,
# )
#
# print(res)
# print(res1)
