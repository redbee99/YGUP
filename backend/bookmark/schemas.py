from backend import ma
from backend.bookmark.models import Bookmark

class BookmarkSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Bookmark
        load_instance = True
        ordered = True

bookmark_schema = BookmarkSchema() # Bookmark
bookmark_list_schema = BookmarkSchema(many=True) #list 뽑아올때 Bookmark[]