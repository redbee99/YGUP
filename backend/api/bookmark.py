from flask_restx import Namespace, Resource, fields
from flask import request
from backend.bookmark.services import create_bookmark, delete_bookmark, userpage_read_bookmark, read_bookmark

api = Namespace("bookmark", description="Bookmark API")

bookmark_fields = api.model(
    "BookMark", {"bkno": fields.Integer, "id": fields.String,
                "cno": fields.String
                }
)

id_fields = api.model(
    "ReadBookMark",{
        "id":fields.String
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

@api.doc(body=id_fields)
class UserReadBookmark(Resource):
    def post(self):
        """Cover_letter Read"""
        return userpage_read_bookmark(request.get_json())

@api.doc(body=id_fields)
class ReadBookmark(Resource):
    def post(self):
        """Cover_letter Read"""
        return read_bookmark(request.get_json())

api.add_resource(CreateBookmark, "/create")
api.add_resource(DeleteBookmark, "/delete")
api.add_resource(UserReadBookmark, "/read_user")
api.add_resource(ReadBookmark, "/read")