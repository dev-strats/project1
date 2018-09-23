from datetime import datetime

def covert_price_to_gdata(data):
    cols = [
             # {'id': 'date', 'label': 'Date', 'type': 'date'},
             {'id': 'date', 'label': 'Date', 'type': 'string'},
             {'id': 'price', 'label': 'Price', 'type': 'number'}
           ]
    # rows = [{'c': [{'v': datetime.strptime(item[0], '%Y-%m-%d')}, {'v': item[1]}]} for item in data]  
    rows = [{'c': [{'v': item[0]}, {'v': item[1]}]} for item in data]  

    result = {'cols': cols, 'rows': rows}
    return result