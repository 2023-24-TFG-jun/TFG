from flask import Blueprint, current_app, jsonify, send_file, send_from_directory, request
from flask_cors import CORS

from .yoloAI import process_video

from .prediction_point_Ligue1 import prediction_point_Ligue1

from .prediction_point_Bundesliga import prediction_point_Bundesliga

from .prediction_point_SerieA import prediction_point_SerieA

from .prediction_point_Premier import prediction_point_Premier

from .predictions_points import prediction_point
from .statsbomb_services import get_prediction_data
import os
from werkzeug.utils import secure_filename

main = Blueprint('main', __name__)
CORS(main, resources={r"/api/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*", "methods": "*"}})



@main.route('/get_prediction_data')
def get_prediction_data_route():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../')
    return send_from_directory(static_folder, 'xG.json')

@main.route('/static/golesEsperados.png')
def send_static():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'golesEsperados.png')


@main.route('/prediction_points/laLiga')
def get_prediction_points():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../')
    return send_from_directory(static_folder, 'laLiga.json')

@main.route('/prediction_points/premier')
def get_prediction_points_Premier():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../')
    return send_from_directory(static_folder, 'premier.json')

@main.route('/prediction_points/serieA')
def get_prediction_points_SerieA():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../')
    return send_from_directory(static_folder, 'serieA.json') 

@main.route('/prediction_points/Bundesliga')
def get_prediction_points_Bundesliga():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../')
    return send_from_directory(static_folder, 'bundesliga.json')

@main.route('/prediction_points/Ligue1')
def get_prediction_points_Ligue1():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../')
    return send_from_directory(static_folder, 'ligue1.json') 

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

@main.route('/static/mapMessi.png')
def send_MessiMap():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'messiMap.png')

@main.route('/static/mapMbappe.png')
def send_mbappeMap():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'mbappeMap.png')

@main.route('/static/locationMapMessi.png')
def send_locationMessiMap():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'locationMessi.png')

@main.route('/static/pasesMessi.png')
def send_pasesMessi():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'pasesMessi.png')

@main.route('/static/enzoMap.png')
def send_enzoMap():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'enzoMap.png')

@main.route('/static/koundeMap.png')
def send_koundeMap():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'koundeMap.png')

@main.route('/static/RodrigodepaulMap.png')
def send_rodrigoDePaulMap():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'RodrigodepaulMap.png')

@main.route('/static/tchouameniMap.png')
def send_tchouameniMap():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'tchouameniMap.png')

@main.route('/static/goalFrance.png')
def send_goalFrance():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'goalFrance.png')

@main.route('/static/locationEnzo.png')
def send_locationEnzo():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'locationEnzo.png')

@main.route('/static/locationKounde.png')
def send_locationKounde():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'locationKounde.png')

@main.route('/static/locationMbappe.png')
def send_locationMbappe():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'locationMbappe.png')

@main.route('/static/locationRodrigoDePaul.png')
def send_locationRodrigoDePaul():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'locationRodrigoDePaul.png')

@main.route('/static/locationTchouameni.png')
def send_locationTchouameni():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'locationTchouameni.png')

@main.route('/static/pasesEnzo.png')
def send_pasesEnzo():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'pasesEnzo.png')

@main.route('/static/pasesKounde.png')
def send_pasesKounde():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'pasesKounde.png')

@main.route('/static/pasesMbappe.png')
def send_pasesMbappe():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'pasesMbappe.png')

@main.route('/static/Ligue1.png')
def send_progresoLigue1():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'Ligue1.png')

@main.route('/static/progresoBundesliga.png')
def send_progresoBundesliga():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'progresoBundesliga.png')

@main.route('/static/progresoLaLiga.png')
def send_progresoLaLiga():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'progresoLaLiga.png')

@main.route('/static/progresoPremier.png')
def send_progresoPremier():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'progresoPremier.png')

@main.route('/static/progresoSerieA.png')
def send_progresoSerieA():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../static')
    return send_from_directory(static_folder, 'progresoSerieA.png')

@main.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
         return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        output_filename = process_video(filepath)
        output_path = os.path.join(current_app.config['UPLOAD_FOLDER'], output_filename)
        return jsonify({"filename": output_filename}), 200

    
@main.route('/get-video/<filename>')
def get_video(filename):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.join(current_dir, '../uploads')
    file_path = os.path.join(static_folder, filename)
    return send_file(file_path, conditional=True)
