from backend import db
from backend.bookmark.models import Bookmark
from backend.bookmark.schemas import bookmark_schema


def create_bookmark(data):
    bookmark = bookmark_schema.load(data)
    db.session.add(bookmark)
    db.session.commit()
    return bookmark_schema.dump(bookmark), 201

def delete_bookmark(data):
    """Delete User"""
    res = db.session.query(Bookmark).filter(Bookmark.bkno == data['bkno']).all()

    if not res:
        return 'fail', 404

    for r in res:
        db.session.delete(r)
        db.session.commit()
