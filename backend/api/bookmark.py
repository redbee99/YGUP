from flask_restx import Namespace, Resource, fields
from flask import request
from backend.bookmark.services import create_bookmark,delete_bookmark
from pytz import timezone
api = Namespace("bookmark", description="Bookmark API")

bookmark_fields = api.model(
    "Cover_letter", {"bkno": fields.Integer, "id": fields.String,
                "cno": fields.String
                }
)

@api.doc(body=bookmark_fields)
class CreateBookmark(Resource):
    def post(self):
        """Cover_letter Create"""
        return create_bookmark(request.get_json())

@api.doc(body=bookmark_fields)
class DeleteBookmark(Resource):
    def post(self):
        """Cover_letter Delete"""
        return delete_bookmark(request.get_json())



api.add_resource(CreateBookmark, "/create")
api.add_resource(DeleteBookmark, "/delete")