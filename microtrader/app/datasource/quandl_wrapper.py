import quandl
import pandas as pd
import datetime
import os
import pickle
import random

quandl.ApiConfig.api_key = 'eAxLue6aGM4kwQcqSHqX'
db_cache = {}

def get_quandl_data(code):
    data_dir = r'./tmp_data/'
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    data_date_str = datetime.datetime.now().strftime("%Y-%m-%d")
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
    global dummy_data_cache
    if ticker not in dummy_data_cache:
        init_date = datetime.datetime.strptime("2010-01-01","%Y-%m-%d")
        dates = []
        date = init_date
        while date.strftime("%Y-%m-%d") != datetime.datetime.now().strftime("%Y-%m-%d"):
            date += datetime.timedelta(days=1)
            dates.append(date.strftime("%Y-%m-%d"))
        values = [random.randint(1,100)/100.0 + 50 for x in dates]
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

def query_data(ticker, ticker_type, start_date, end_date):
    global db_cache
    key = ticker + "@" + ticker_type
    if key not in db_cache:
        db_cache[key] = get_quandl_data(ticker) # consider add ticker_type (for example - here  the ticker_type is quandl.)
        # db_cache[key] = get_dummy_data(ticker) # consider add ticker_type (for example - here  the ticker_type is quandl.)
    raw_data = db_cache[key]

    refined_data = pd.Series(raw_data["Settle"])[start_date:end_date]

    # fix this temp hack - needs correct holiday calendar.
    if len(refined_data) == 0 and start_date == end_date:
        refined_data = pd.Series(raw_data["Settle"])[start_date - datetime.timedelta(days=5):end_date]
        refined_data = refined_data[0:1]
    return refined_data

if __name__ == "__main__":
    data = get_quandl_data('CME/ESU2013')
    print(data)