from flask_restx import Namespace, Resource, fields
from flask import request
from backend.cover_letter.services import create_cover_letter, update_cover_letter, delete_cover_letter
api = Namespace("cover_letter", description="Cover_letter API")


cl_fields = api.model(
    "Cover_letter", {"clno": fields.Integer, "id": fields.String,
                "cname": fields.String, "content_1": fields.String,
                "content_2": fields.String, "content_3": fields.String,
                "wdate": fields.DateTime, "clname" : fields.String
                }
)

@api.doc(body=cl_fields)
class CreateCover_letter(Resource):
    def post(self):
        """Cover_letter Create"""
        return create_cover_letter(request.get_json())

@api.doc(body=cl_fields)
class UpdateCover_letter(Resource):
    def post(self):
        """Cover_letter Update """
        return update_cover_letter(request.get_json())

@api.doc(body=cl_fields)
class DeleteCover_letter(Resource):
    def post(self):
        """Cover_letter Delete"""
        return delete_cover_letter(request.get_json())


api.add_resource(CreateCover_letter, "/create")
api.add_resource(UpdateCover_letter, "/update")
api.add_resource(DeleteCover_letter, "/delete")