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