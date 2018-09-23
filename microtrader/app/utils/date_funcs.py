import datetime
import pandas as pd

# date objects are pd.datetime

def calc_time(d1,d2):
    return (d2-d1).days/365.0