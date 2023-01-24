from flask_restx import Namespace, Resource, fields
from flask import request
from backend.company.services import create_company, update_company, delete_company
api = Namespace("company", description="Company API")

company_fields = api.model(
    "Company", {"cname": fields.String,
                "keyword": fields.String, "wcloud": fields.String,
                "wcloud_url": fields.String, "address": fields.String,
                "sales": fields.String,
                "owner": fields.String, "info": fields.String,
                "pay": fields.String, "courl": fields.String,
                "logo": fields.String, "logo_url": fields.String,
                "resign": fields.String,"form": fields.String,
                "bookmarkcnt": fields.Integer, "readcnt": fields.Integer
                }
)

company_delete_fields = api.model(
    "CompanyDelete", {
                    "cname": fields.String,
                    "uno": fields.Integer
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

@api.doc(body=company_delete_fields)
class DeleteCompany(Resource):
    def post(self):
        """Company Delete"""
        return delete_company(request.get_json())

class ReadAllCompany(Resource):
    def get(self):
        """Get All Company"""


api.add_resource(CreateCompany, "/create")
api.add_resource(UpdateCompany, "/update")
api.add_resource(DeleteCompany, "/delete")