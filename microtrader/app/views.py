from flask import render_template, flash, redirect, jsonify, request
from app import app
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import dateutil
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

@app.route('/internal/tradable/<tradable_name>/<from_date>/<to_date>')
def tradable_data(tradable_name, from_date, to_date):
    tradable_name = converter.revert_slash(tradable_name)
    from_date = pd.to_datetime(from_date)
    to_date = pd.to_datetime(to_date)
    # print("+++ In tradable_data function: tradable_name = '{}', from_date = {}, to_date = {}".format(tradable_name, from_date, to_date))

    tradable = TradableManager.get_tradable_by_name(tradable_name)
    tradable.get_values(from_date, to_date)
    json_data = tradable.to_json(from_to_date=(from_date, to_date))
    json_data["values"] = converter.covert_price_to_gdata(json_data["values"])

    return jsonify(json_data)

@app.route('/data/<name>/<from_date>/<to_date>')
def data(name, from_date, to_date):
    return render_template('tradable.html', tradable_type='data', tradable_name=name, from_date=from_date, to_date=to_date)

@app.route('/strategy')
@app.route('/strategy/<name>')
@app.route('/strategy/<name>/<from_date>/<to_date>')
def strategy(name=None, from_date=None, to_date=None):
    if name is not None:
        name = converter.revert_slash(name)
    # print("*** In strategy function: name = '{}', from_date = {}, to_date = {}".format(name, from_date, to_date))

    if name is not None and from_date is None:
        from_date = datetime.today() + relativedelta(months = -1)  # Default 1M
        to_date = datetime.today().strftime("%Y-%m-%d")
    return render_template('tradable.html', tradable_type='strategy', tradable_name=name, from_date=from_date, to_date=to_date)

@app.route('/internal/strategy_postback', methods=['GET', 'POST'])
def strategy_postback():
    # request.args: the key/value pairs in the URL query string
    # request.form: the key/value pairs in the body, from a HTML post form, or JavaScript request that isn't JSON encoded
    data = request.form.to_dict(flat=True)

    strategy_name = data['strategy_name']
    strategy_name_1 = converter.revert_slash(strategy_name)
    strategy = TradableManager.get_tradable_by_name(strategy_name_1)
    param_data = strategy.get_param_data_json()

    for key in param_data:
        valueType = type(param_data[key])
        if valueType is str:
            param_data[key] = data[key]
        elif valueType is int:
            param_data[key] = int(data[key])
        elif valueType is float:
            param_data[key] = float(data[key])
        elif valueType is datetime:
            param_data[key] = dateutil.parser.parse(data[key])

    strategy.update(**param_data)
    # return str(param_data)
    return redirect('/strategy/' + strategy_name)
