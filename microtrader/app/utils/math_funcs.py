import math
import pandas as pd

def realized_variance_exp_decay(pd_series, beta, target, start_date):
    realized = target*target
    pd_series1 = pd_series[start_date:]
    start_date_actual = pd_series1.index[0]
    s = pd_series[start_date_actual]
    realized_series = []
    for date in pd_series1.index:
        if date == start_date_actual:
            realized_series.append(realized)
            continue
        else:
            ret = math.log(pd_series1[date]/s)
            realized = beta * realized + (1-beta)*ret*ret*252
            s = pd_series1[date]
            realized_series.append(realized)

    return pd.Series(realized_series, index=pd_series1.index)

def add_dict(dict1, dict2):
    ret = {key: dict1.get(key, 0) + dict2.get(key, 0) for key in set(dict1.keys()) | set(dict2.keys())}
    return ret

def add_dict_in_place(dict1, dict2):
    extra_keys = set(dict2) - set(dict1)
    for key in dict1:
        dict1[key] += dict2.get(key, 0)

    for key in extra_keys:
        dict1[key] = dict2[key]

def add_dicts(lst_dicts):
    ret = {}
    for item in lst_dicts:
        add_dict_in_place(ret, item)
    return ret

def apply_f_on_dict(dict1, f):
    ret = {}
    for key in dict1:
        ret[key] = f(dict1[key])
    return ret

def get_max_draw_down(pd_series, start_date, end_date):
    # to be robust on start_date, end_date being holidays
    pd_series_1 = pd_series[start_date:end_date]

    highest_level = pd_series_1[0]
    current_max_draw_down = 0

    for date in pd_series_1.index:
        if (pd_series[date] - highest_level) / highest_level < current_max_draw_down:
            current_max_draw_down = (pd_series[date] - highest_level) / highest_level
        elif pd_series[date] > highest_level:
            highest_level = pd_series[date]

    return current_max_draw_down

def get_vol(pd_series, start_date, end_date):
    pd_series1 = pd_series[start_date:end_date]
    pd_series2 = pd_series1.shift(1)
    pd_returns = pd_series1.div(pd_series2)[1:]
    avg_ret = sum(pd_returns)/len(pd_returns)
    avg_ret_2 = sum(pd_returns.multiply(pd_returns)) / len(pd_returns)
    vol = math.sqrt((avg_ret_2 - avg_ret*avg_ret)*252)
    return vol

def get_return(pd_series, start_date, end_date):
    # to be robust on start_date, end_date being holidays
    pd_series_1 = pd_series[start_date:end_date]
    return (pd_series_1[-1] - pd_series_1[0])/pd_series_1[0]


