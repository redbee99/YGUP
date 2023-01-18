from flask_restx import Namespace, Resource, fields
from flask import request
from backend.user.services import create_user, login_user, delete_user, update_user, \
    search_id, search_pw, check_overlap_id
api = Namespace("user", description="User API")
user_fields = api.model(
    "User", {"id": fields.String, "email": fields.String, "name": fields.String, "password": fields.String}
)
login_fields = api.model(
    "User_Login", {"id": fields.String, "password": fields.String}
)
idsearch_fields = api.model(
    "User_Idsearch", {"email": fields.String, "name": fields.String}
)
pwsearch_fields = api.model(
    "User_Pwsearch", {"id": fields.String, "email": fields.String, "name": fields.String}
)
coid_fields = api.model(
    "User_coid", {"id": fields.String}
)

@api.doc(body=user_fields)
class SignUp(Resource):
    def post(self):
        """user signup"""
        return create_user(request.get_json())

@api.doc(body=login_fields)
class Login(Resource):
    def post(self):
        """login user"""
        return login_user(request.get_json())
@api.doc(body=login_fields)
class Delete(Resource):
    def post(self):
        """Delete user"""
        return delete_user(request.get_json())

@api.doc(body=user_fields)
class UpdateUser(Resource):
    def post(self):
        """user Update"""
        return update_user(request.get_json())
@api.doc(body=idsearch_fields)
class SearchId(Resource):
    def post(self):
        """search Id"""
        return search_id(request.get_json())
@api.doc(body=pwsearch_fields)
class SearchPw(Resource):
    def post(self):
        """search Pw"""
        return search_pw(request.get_json())

@api.doc(body=coid_fields)
class CheckOverlapId(Resource):
    def post(self):
        """Check Overlap Id"""
        return check_overlap_id(request.get_json())

api.add_resource(SignUp, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Delete, "/delete")
api.add_resource(UpdateUser, "/update")
api.add_resource(SearchId, "/searchid")
api.add_resource(SearchPw, "/searchpw")
api.add_resource(CheckOverlapId, "/overlapid")