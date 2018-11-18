from flask import render_template, flash, redirect, jsonify 
from app import app
import pandas as pd
from .models.tradable_base import TradableManager
from .utils import converter

@app.route('/')
@app.route('/index')
def index():
    return 'Hello world!'

@app.route('/internal/strategy_names_by_type')
def strategy_names_by_type():
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
    # TradableManager.load_strategy_definitions()
    TradableManager.load_strategies()
    return render_template('strategy.html')