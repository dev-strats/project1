from flask import render_template, flash, redirect, jsonify, request
from app import app
from datetime import datetime, timedelta
import pandas as pd
from .models.tradable_base import TradableManager
from .utils import converter

# Initalize TradableManager
TradableManager.load_strategies()

@app.route('/')
@app.route('/index')
def index():
    return 'Hello world!'

@app.route('/internal/strategy_names_by_type')
def strategy_names_by_type():
    ret = TradableManager.get_all_strategy_names_by_types()
    return jsonify(ret)

@app.route('/internal/strategy_types')
def strategy_types():
    ret = TradableManager.get_all_strategy_types()
    return jsonify(ret)

@app.route('/internal/strategy_names/<type_name>')
def strategy_names(type_name):
    ret = TradableManager.get_all_strategy_names_by_type(type_name)
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
@app.route('/strategy/<strategy_name>')
@app.route('/strategy/<strategy_name>/<start_date>/<end_date>')
def strategy(strategy_name=None, start_date=None, end_date=None):
    if strategy_name is not None and start_date is None:
        start_date = datetime.today() - timedelta(months = -1)  # Default 1M
        end_date = datetime.today().strftime("%Y-%m-%d")
    return render_template('strategy.html', strategy_name=strategy_name, start_date=start_date, end_date=end_date)

@app.route('/internal/strategy_postback', methods=['GET', 'POST'])
def test_action():
    # request.args: the key/value pairs in the URL query string
    # request.form: the key/value pairs in the body, from a HTML post form, or JavaScript request that isn't JSON encoded
    data = request.form.to_dict(flat=False)

    # this is tempoary code:
    # the str to float func can be a generic pre-process step before send to model api ?
    # the hard-coded strategy need to be linked to the real "current" strategy..
    # tested that the api persist the data - however how do we refresh the page automatically.

    def is_number(x):
        try:
            float(x)
            return True
        except:
            return False

    data = {k:float(v[0]) if is_number(v[0]) else v[0] for (k,v) in data.items()}
    strategy = TradableManager.get_tradable_by_name("Vol_Target_on_Rolling_Future_001")
    strategy.update(**data)
    return str(data)
