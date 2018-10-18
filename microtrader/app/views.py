from flask import render_template, flash, redirect, jsonify 
from app import app
import pandas as pd
from .models.tradable_base import TradableManager
from .utils import converter

@app.route('/')
@app.route('/index')
def index():
    return 'Hello world!'

# Tao: should let TradableManager do such work internally,
#      so will remove this function in future
def load_all_tradables():
    # a dummy function to return some tradables
    # this will be replaced by proper load of real positions

    from .models.rolling_future_strategy import RollingFutureStrategy
    from .models.vol_target import VolTarget

    rf = RollingFutureStrategy("Rolling_Future_001", "ES", "QUANDL", "CME/ESH2013", pd.to_datetime("2013-04-15"))
    vt = VolTarget("Vol_Target_on_Rolling_Future_001", "Rolling_Future_001", 0.8, 0.2, pd.to_datetime("2013-04-15"))

@app.route('/internal/strategy_names_by_type')
def strategy_names_by_type():
    load_all_tradables()
    ret = TradableManager.get_all_strategy_names_by_types()
    return jsonify(ret)

@app.route('/internal/tradable/<tradable_name>/<start_date>/<end_date>')
def tradable_data(tradable_name, start_date, end_date):
    start_date = pd.to_datetime(start_date)
    end_date = pd.to_datetime(end_date)

    tradable = TradableManager.get_tradable_by_name(tradable_name)
    tradable.get_values(start_date, end_date)
    json_data = tradable.to_json(start_end_date=(start_date,end_date))
    json_data["values"] = converter.covert_price_to_gdata(json_data["values"])

    return jsonify(json_data)

@app.route('/strategy')
def strategy():
    return render_template('strategy.html')