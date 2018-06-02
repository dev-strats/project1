import quandl

quandl.ApiConfig.api_key = 'eAxLue6aGM4kwQcqSHqX'

def get_quandl_data(code):
    return quandl.get(quandlContractCode)
    
    
# Test
if __name__ == "__main__":
    quandlContractCode = 'CME/ESU2018'
    mydata = get_quandl_data(quandlContractCode)
    print(mydata)
