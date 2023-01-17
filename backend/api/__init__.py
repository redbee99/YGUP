from flask import Blueprint
from flask_restx import Api

from backend.api.user import api as user_ns
from backend.api.health import api as health_ns

api_bp = Blueprint("api", __name__)

api = Api(api_bp, title="YGUP REST API", description="A REST API build with Flask")

api.add_namespace(health_ns)
api.add_namespace(user_ns)