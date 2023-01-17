from flask_restx import Namespace, Resource, fields
from flask import request
from backend.user.services import create_user, login_user, delete_user, update_user, search_id, search_pw, check_overlap_id

api = Namespace("user", description="User API")

user_fields = api.model(
    "User", {"id": fields.String, "email": fields.String, "name": fields.String, "password": fields.String}
)

@api.doc(body=user_fields)
class SignUp(Resource):
    def post(self):
        """user signup"""
        return create_user(request.get_json())

class Login(Resource):
    def post(self):
        """login user"""
        return login_user(request.get_json())

class Delete(Resource):
    def get(self, user_id, user_pw):
        """Delete user"""
        return delete_user(user_id, user_pw)

@api.doc(body=user_fields)
class UpdateUser(Resource):
    def post(self):
        """user Update"""
        return update_user(request.get_json())

class SearchId(Resource):
    def get(self, user_name, user_email):
        """search Id"""
        return search_id(user_name, user_email)

class SearchPw(Resource):
    def get(self, user_id, user_name, user_email):
        """search Pw"""
        return search_pw(user_id,user_name, user_email)

class CheckOverlapId(Resource):
    def get(self, user_id):
        """Check Overlap Id"""
        return check_overlap_id(user_id)

api.add_resource(SignUp, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Delete, "/delete/<string:user_id>/<string:user_pw>")
api.add_resource(UpdateUser, "/update")
api.add_resource(SearchId, "/searchid/<string:user_name>/<string:user_email>")
api.add_resource(SearchPw, "/searchpw/<string:user_id>/<string:user_name>/<string:user_email>")
api.add_resource(CheckOverlapId, "/overlapid/<string:user_id>")