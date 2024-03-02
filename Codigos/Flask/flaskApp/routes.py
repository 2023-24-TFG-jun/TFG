from flask import Blueprint, jsonify
from .statsbomb_services import get_prediction_data

main = Blueprint('main', __name__)

@main.route('/data')
def data():
    data = get_prediction_data()
    return jsonify([data])

