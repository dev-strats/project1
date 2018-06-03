import quandl
import pandas as pd

quandl.ApiConfig.api_key = 'eAxLue6aGM4kwQcqSHqX'

def get_quandl_data(code):
    return quandl.get(code)

# Test
if __name__ == "__main__":
    quandlContractCode = 'CME/ESU2018'
    mydata = get_quandl_data(quandlContractCode)
    mydata_filtered = pd.Series(mydata.Last)
    ret = mydata_filtered[pd.to_datetime("2018-05-01"):pd.to_datetime("2018-05-29")]
    print(ret)
