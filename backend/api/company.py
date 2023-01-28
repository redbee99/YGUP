from flask_restx import Namespace, Resource, fields
from flask import request
from backend.company.services import create_company, update_company, delete_company, read_all_company, search_company, \
    rank_company, read_company

api = Namespace("company", description="Company API")

company_fields = api.model(
    "Company", {"cname": fields.String,
                "keyword": fields.String,
                "wcloud_url": fields.String, "address": fields.String,
                "sales": fields.String,
                "owner": fields.String, "info": fields.String,
                "pay": fields.String, "courl": fields.String,
                "logo_url": fields.String,
                "resign": fields.String,"form": fields.String,
                "bookmarkcnt": fields.Integer, "readcnt": fields.Integer,
                "uno": fields.Integer
                }
)

company_delete_fields = api.model(
    "CompanyDelete", {
                    "cname": fields.String,
                    "uno": fields.Integer
                }
)

company_read_fields = api.model(
    "CompanyRead", {
                    "uno": fields.Integer
                }
)

search_company_fields = api.model(
    "SearchCompany", {
                    "searchData": fields.String
                }
)

rank_company_fields = api.model(
    "RankCompany", {
                    "f_all": fields.Integer,
                    "type": fields.String
                }
)

company_info_fields = api.model(
    "Companyinfo", {
        "cname": fields.String
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
@api.doc(body=company_read_fields)
class ReadAllCompany(Resource):
    def post(self):
        """Get All Company"""
        return read_all_company(request.get_json())

@api.doc(body=search_company_fields)
class SearchCompany(Resource):
    def post(self):
        """Search Company"""
        return search_company(request.get_json())

@api.doc(body=rank_company_fields)
class RankCompany(Resource):
    def post(self):
        """Search Company"""
        return rank_company(request.get_json())

@api.doc(body=company_info_fields)
class ReadCompany(Resource):
    def post(self):
        """Read Company"""
        return read_company(request.get_json())

api.add_resource(CreateCompany, "/create")
api.add_resource(UpdateCompany, "/update")
api.add_resource(DeleteCompany, "/delete")
api.add_resource(ReadAllCompany, "/readall")
api.add_resource(SearchCompany, "/search")
api.add_resource(RankCompany, "/rank")
api.add_resource(ReadCompany, "/readcompany")
