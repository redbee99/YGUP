from flask_restx import Namespace, Resource, fields
from backend.user.services import create_user, login_user, delete_user, update_user, \
    search_id, search_pw, check_overlap_id, pwupdate_user, read_user, read_all_users, \
    delete_user_admin, check_overlap_email


from flask import request

api = Namespace("user", description="User API")
user_fields = api.model(
    "User", {"id": fields.String, "email": fields.String, "name": fields.String, "password": fields.String, "chk_pwd" : fields.String}
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
coemail_fields = api.model(
    "User_Email", {"email":fields.String}
)
pwupdate_fields = api.model(
    "User_pwupdate", {"id": fields.String, "password": fields.String, "new_pwd": fields.String, "new_pwd_chk": fields.String }
)
admin_fields = api.model(
    "All_Users",{"uno":fields.Integer}
)
delete_user_admin_fields = api.model(
    "Delete_Users_Admin",{"id": fields.String, "uno":fields.Integer}
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

@api.doc(body=coemail_fields)
class CheckOverlapEmail(Resource) :
    def post(self):
        """Check Overlap Email"""
        return check_overlap_email(request.get_json())

@api.doc(body=pwupdate_fields)
class User_pwupdate(Resource):
    def post(self):
        """update pw"""
        return pwupdate_user(request.get_json())

@api.doc(body=coid_fields)
class User_read(Resource):
    def post(self):
        """read user"""
        return read_user(request.get_json())

@api.doc(body=admin_fields)
class Read_all_users(Resource):
    def post(self):
        """read all users"""
        return read_all_users(request.get_json())

@api.doc(body=delete_user_admin_fields)
class Admin_Delete(Resource):
    def post(self):
        """Delete user admin"""
        return delete_user_admin(request.get_json())

api.add_resource(SignUp, "/join")
api.add_resource(Login, "/login")
api.add_resource(Delete, "/delete")
api.add_resource(Admin_Delete, "/admin_delete")
api.add_resource(UpdateUser, "/userinfo_update")
api.add_resource(SearchId, "/idsearch")
api.add_resource(SearchPw, "/pwsearch")
api.add_resource(CheckOverlapId, "/overlapid")
api.add_resource(User_pwupdate, "/pwupdate")
api.add_resource(User_read, "/userinfo")
api.add_resource(Read_all_users, "/user_list")
api.add_resource(CheckOverlapEmail, "/overlapemail")
