import quandl
import pandas as pd
import datetime
import os
import json
import pickle

quandl.ApiConfig.api_key = 'eAxLue6aGM4kwQcqSHqX'
db_cache = {}

def get_quandl_data(code):
    data_dir = r'C:\temp\datadata\\'
    if os.path.isfile(data_dir + code.replace("/","~") + r'.pkl'):
        with open(data_dir + code.replace("/","~") + r'.pkl','rb') as outFile:
            ret = pickle.load(outFile)
    else:
        ret = quandl.get(code)
        if not os.path.exists(data_dir):
            os.makedirs(data_dir)
        with open(data_dir + code.replace("/","~") + r'.pkl','wb') as outFile:
            pickle.dump(ret, outFile,protocol=pickle.HIGHEST_PROTOCOL)

    return ret

def query_data(ticker, ticker_type, start_date, end_date):
    global db_cache
    key = ticker + "@" + ticker_type
    if key not in db_cache:
        db_cache[key] = get_quandl_data(ticker) # consider add ticker_type (for example - here  the ticker_type is quandl.)
    raw_data = db_cache[key]

    refined_data = pd.Series(raw_data.Settle)[start_date:end_date]

    # fix this temp hack - needs correct holiday calendar.
    if len(refined_data) == 0 and start_date == end_date:
        refined_data = pd.Series(raw_data.Settle)[start_date - datetime.timedelta(days=5):end_date]
        refined_data = refined_data[0:1]
    return refined_data

if __name__ == "__main__":
    data = get_quandl_data('CME/ESU2013')
    print(data)