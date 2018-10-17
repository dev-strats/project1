__author__ = 'ythtb_000'


import models
from flask import Flask,jsonify
app = Flask(__name__)
import patch_json

@app.route('/')
def hello():
    return 'Hello, world!'

@app.route('/rolling_future/<start_date>/<end_date>')
def rolling_futures(start_date, end_date):
    print(start_date)
    print(end_date)
    dummy_rolling_futures = [models.Rolling_Future_Strategy("Rolling Future 001", "ES", "QUANDL","CME/ESH2013", start_date)]
    dummy_rolling_futures[0].get_values(start_date,end_date)
    return jsonify(dummy_rolling_futures)

if __name__ == '__main__':
    app.run()

