import pandas as pd
from app.models.rolling_future_strategy import RollingFutureStrategy
from app.models.vol_target import VolTarget
from app.models.cash import Cash
from app.utils import converter

start_date = pd.to_datetime('2018-01-01')
end_date = pd.to_datetime('2018-08-31')
rf = RollingFutureStrategy("Rolling Future 001", "ES", "QUANDL","CME/ESH2013", start_date)
result = rf.get_values(start_date,end_date)
print(rf.to_json())

vt = VolTarget("Vol Target on Rolling Future 001", "Rolling Future 001", 0.8, 0.2, start_date)
vt.get_values(pd.to_datetime(start_date),pd.to_datetime(end_date))
print(vt.to_json())
# result = converter.covert_price_to_gdata(result)

# cash = Cash("USD")
# result = cash.get_values(start_date,end_date)
# print (cash.to_json())
