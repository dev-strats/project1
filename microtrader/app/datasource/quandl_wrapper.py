import quandl
import pandas as pd
from datetime import datetime, timedelta
import os
import pickle
import random
from app.randomizers import market_data_randomizer

quandl.ApiConfig.api_key = 'eAxLue6aGM4kwQcqSHqX'

def get_quandl_data(code):
    """
    Download data from Quandl, saving into pickle file

    Argument: 
    code: Quandl code (e.g. CME/ESU2013).
    """
    data_dir = r'./tmp_data/'
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    data_date_str = datetime.now().strftime("%Y-%m-%d")
    file_name = code.replace("/","~") + "_" + data_date_str

    if os.path.isfile(data_dir + file_name + r'.pkl'):
        with open(data_dir + file_name + r'.pkl','rb') as outFile:
            ret = pickle.load(outFile)
    else:
        ret = quandl.get(code)
        with open(data_dir + file_name + r'.pkl','wb') as outFile:
            pickle.dump(ret, outFile,protocol=pickle.HIGHEST_PROTOCOL)

    return ret

dummy_data_cache = {}
def get_dummy_data(ticker):
    """
    Get dummy (random) data
    """
    global dummy_data_cache
    if ticker not in dummy_data_cache:
        init_date = datetime.strptime("2010-01-01","%Y-%m-%d")
        target_date = datetime.now()
        range_dates = range(0, (target_date - init_date).days)

        dates = [(init_date + timedelta(days=x)).strftime('%Y-%m-%d') for x in range_dates]
        values = [random.randint(1,100)/100.0 + 50 for x in range_dates]
        data = {'Date': dates, 'Value': values}

        df = pd.DataFrame(data)
        df['Date'] = pd.to_datetime(df['Date'])
        ts = pd.Series(df['Value'].values, index=df['Date'])
        dummy_data_cache[ticker] = ts
    else:
        ts = dummy_data_cache[ticker]

    ret = {
        "Settle" : ts
    }
    return ret

data_disturbance_vol = 0
def set_data_disturbance_vol(vol):
    global data_disturbance_vol
    data_disturbance_vol = vol

db_cache = {}
def query_data(ticker, ticker_type, start_date, end_date):
    """
    Get data from cache (if does not exist, download from Quandl or Yahoo).
    Then pick up the required range [start_date:end_date]

    Arguments:
    ticker: ticker name.
    ticker_type: 'QUANDL' or 'YAHOO'.
    start_date: .
    end_date: .
    """
    global db_cache
    key = ticker + "@" + ticker_type
    if key not in db_cache:
        if ticker_type == 'QUANDL':
            db_cache[key] = get_quandl_data(ticker) # consider add ticker_type (for example - here  the ticker_type is quandl.)
            # db_cache[key] = get_dummy_data(ticker) # consider add ticker_type (for example - here  the ticker_type is quandl.)
        elif ticker_type == 'YAHOO':
            db_cache[key] = pd.read_csv('./yahoo_data/{}.csv'.format(ticker), index_col='Date', parse_dates=['Date'])
        else:
            raise Exception('Unknown ticker_type: ' + ticker_type)

    raw_data = db_cache[key]['Settle'] if ticker_type == 'QUANDL' else db_cache[key]['Adj Close']

    refined_data = pd.Series(raw_data)[start_date:end_date]

    # fix this temp hack - needs correct holiday calendar.
    if len(refined_data) == 0 and start_date == end_date:
        refined_data = pd.Series(raw_data)[start_date - timedelta(days=5):end_date]
        refined_data = refined_data[0:1]

    def randomize_func(x):
        return market_data_randomizer.get_randomized_data_log_normal(x,data_disturbance_vol)

    refined_data.apply(randomize_func)
    return refined_data

if __name__ == "__main__":
    data = get_quandl_data('CME/ESU2013')
    print(data)