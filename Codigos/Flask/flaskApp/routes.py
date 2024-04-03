from flask import Blueprint, jsonify, send_from_directory

from .prediction_point_Ligue1 import prediction_point_Ligue1

from .prediction_point_Bundesliga import prediction_point_Bundesliga

from .prediction_point_SerieA import prediction_point_SerieA

from .prediction_point_Premier import prediction_point_Premier

from .predictions_points import prediction_point
from .statsbomb_services import get_prediction_data
import os

main = Blueprint('main', __name__)


@main.route('/get_prediction_data')
def get_prediction_data_route():
    results = get_prediction_data()
    return jsonify({"GolesEsperados": results})  


@main.route('/static/golesEsperados.png')
def send_static():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'golesEsperados.png')


@main.route('/prediction_points/laLiga')
def get_prediction_points():
    results = prediction_point()
    return jsonify({"Laliga": results}) 

@main.route('/prediction_points/premier')
def get_prediction_points_Premier():
    results = prediction_point_Premier()
    return jsonify({"Premier": results})  

@main.route('/prediction_points/serieA')
def get_prediction_points_SerieA():
    results = prediction_point_SerieA()
    return jsonify({"serieA": results})  

@main.route('/prediction_points/Bundesliga')
def get_prediction_points_Bundesliga():
    results = prediction_point_Bundesliga()
    return jsonify({"Bundesliga": results})  

@main.route('/prediction_points/Ligue1')
def get_prediction_points_Ligue1():
    results = prediction_point_Ligue1()
    return jsonify({"Ligue1": results})  

@main.route('/static/mapaCalorOlmo.png')
def send_mapOlmo():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'mapaCalorOlmo.png')


@main.route('/static/mapaCalorRodri.png')
def send_mapRodri():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'mapaCalorRodri.png')


@main.route('/static/matchMomentumFinal.png')
def send_matchMomentumFinal():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'matchMomentumFinal.png')

@main.route('/static/goalArgentina.png')
def send_goal():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'goalArgentina.png')