from flask import Blueprint
from flask_restx import Api

from backend.api.user import api as user_ns
from backend.api.health import api as health_ns
from backend.api.company import api as company_ns
from backend.api.cover_letter import api as cover_letter_ns
from backend.api.bookmark import api as bookmark_ns

api_bp = Blueprint("api", __name__)

api = Api(api_bp, title="YGUP REST API", description="A REST API build with Flask")

api.add_namespace(health_ns)
api.add_namespace(user_ns)
api.add_namespace(company_ns)
api.add_namespace(cover_letter_ns)
api.add_namespace(bookmark_ns)