import os
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.config['UPLOAD_FOLDER'] = 'uploads'
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
 
    from .routes import main as main_routes
    app.register_blueprint(main_routes)

    return app
