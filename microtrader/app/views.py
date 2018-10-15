from flask import render_template, flash, redirect, jsonify 
from app import app
import pandas as pd
from .models.rolling_future_strategy import RollingFutureStrategy
from .models.vol_target import VolTarget
from .models.tradable_base import TradableManager
from .utils import converter

@app.route('/')
@app.route('/index')
def index():
    return 'Hello world!'

@app.route('/future_data/<start_date>/<end_date>')
def rolling_future_data(start_date, end_date):
    # this function should be retired one the internal tradable API is wired into the webpage
    start_date = pd.to_datetime(start_date)
    end_date = pd.to_datetime(end_date)

    rf = RollingFutureStrategy("Rolling Future 001", "ES", "QUANDL", "CME/ESH2013", start_date)
    values = rf.get_values_json(start_date, end_date)
    result = {
            "properties" : rf.get_properties(),
            "param_data" : rf.get_param_data(),
            "values"     : converter.covert_price_to_gdata(values)
    }
    return jsonify(result)

@app.route('/internal/load_all_tradables')
def load_all_tradables():
    # a dummy function to return some tradables
    # this will be replaced by proper load of real positions
    rf = RollingFutureStrategy("Rolling Future 001", "ES", "QUANDL", "CME/ESH2013", pd.to_datetime("2013-04-15"))
    vt = VolTarget("Vol Target on Rolling Future 001", "Rolling Future 001", 0.8, 0.2, pd.to_datetime("2013-04-15"))
    return jsonify({})

@app.route('/internal/tradable_names_by_type')
def tradable_names_by_type():
    ret = TradableManager.get_all_tradable_names_by_types()
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

@app.route('/future')
def rolling():
    return render_template('future.html')
