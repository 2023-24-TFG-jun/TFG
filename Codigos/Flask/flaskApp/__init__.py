from flask import Flask

def create_app():
    app = Flask(__name__)
    
    # Importar y registrar los Blueprints o vistas
    from .routes import main as main_routes
    app.register_blueprint(main_routes)

    return app
