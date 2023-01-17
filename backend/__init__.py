from flask import Flask
from backend.extensions import db, ma
from flask_cors import CORS

def create_app(script_info=None):
    app = Flask(__name__)
    app.config.from_object("backend.config.DevConfig")
    register_extensions(app)
    CORS(app, resources={r'*': {'origins': '*'}})

    from backend.api import api_bp

    app.register_blueprint(api_bp, url_prefix="/api")

    return app

def register_extensions(app):
    db.init_app(app)
    ma.init_app(app)