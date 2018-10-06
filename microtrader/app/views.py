from flask import render_template, flash, redirect, jsonify 
from app import app
import pandas as pd
from .models.rolling_future_strategy import RollingFutureStrategy
from .utils import converter

@app.route('/')
@app.route('/index')
def index():
    return 'Hello world!'

@app.route('/future_data/<start_date>/<end_date>')
def rolling_future_data(start_date, end_date):
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
    
@app.route('/future')
def rolling():
    return render_template('future.html')
