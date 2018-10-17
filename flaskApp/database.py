__author__ = 'ythtb_000'

import quandl
import pandas as pd
import datetime

quandl.ApiConfig.api_key = 'eAxLue6aGM4kwQcqSHqX'
db_cache = {}

def db_query_func(ticker, ticker_type, start_date, end_date):
    global db_cache
    key = ticker+"@"+ticker_type
    if key in db_cache:
        raw_data = db_cache[key]
    else:
        raw_data = get_quandl_data(ticker) # consider add ticker_type (for example - here  the ticker_type is quandl.)
        db_cache[key] = raw_data

    refined_data = pd.Series(raw_data.Settle)[start_date:end_date]

    # fix this temp hack - needs correct holiday calendar.
    if len(refined_data) == 0 and start_date == end_date:
        refined_data = pd.Series(raw_data.Settle)[start_date - datetime.timedelta(days=5):end_date]
        refined_data = refined_data[0:1]
    return refined_data

def get_quandl_data(code):
    return quandl.get(code)



# Test
# if __name__ == "__main__":
#     quandlContractCode = 'CME/ESU2018'
#     mydata = get_quandl_data(quandlContractCode)
#     mydata_filtered = pd.Series(mydata.Last)
#     ret = mydata_filtered[pd.to_datetime("2018-05-01"):pd.to_datetime("2018-05-29")]
#     print(ret)
