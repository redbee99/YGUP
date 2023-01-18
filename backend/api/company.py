from flask_restx import Namespace, Resource, fields
from flask import request
from backend.company.services import create_company, update_company, delete_company
api = Namespace("company", description="Company API")

company_fields = api.model(
    "Company", {"cno": fields.String, "cname": fields.String,
                "keyword": fields.String, "wcloud": fields.String,
                "wcloud_url": fields.String, "address": fields.String,
                "sales": fields.String,
                "owner": fields.String, "info": fields.String,
                "pay": fields.String, "courl": fields.String,
                "logo": fields.String, "logo_url": fields.String,
                "resign": fields.String,"form": fields.String,
                "bookmark": fields.Integer, "readcnt": fields.Integer,
                "user_type": fields.String
                }
)
@api.doc(body=company_fields)

class CreateCompany(Resource):
    def post(self):
        """Create Company"""
        return create_company(request.get_json())

@api.doc(body=company_fields)
class UpdateCompany(Resource):
    def post(self):
        """company Update"""
        return update_company(request.get_json())

@api.doc(body=company_fields)
class DeleteCompany(Resource):
    def post(self, ):
        """Company Delete"""
        return delete_company(request.get_json())

api.add_resource(CreateCompany, "/create")
api.add_resource(UpdateCompany, "/update")
api.add_resource(DeleteCompany, "/delete")