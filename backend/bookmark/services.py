from backend import db
from backend.bookmark.models import Bookmark
from backend.user.models import User
from backend.bookmark.schemas import bookmark_schema
import uuid

'''def create_bookmark(data):
    bookmark = bookmark_schema.load(data)
    db.session.add(bookmark)
    db.session.commit()
    return bookmark_schema.dump(bookmark), 201
    '''

def create_bookmark(data):
    """Create Bookmark"""
    bkno = {'bkno': str(uuid.uuid1())}
    data['body'].get('data').update(bkno)
    res = db.session.query.with_entities(Bookmark.id, Bookmark.cname, Bookmark.state)\
    .filter(Bookmark.id == data['body'].get('id') and Bookmark.cname == data['body'].get('cname')).first()
    bookmark = Bookmark(bkno=data['body'].get('data').get('bkno'), id=data['body'].get('data').get('id'),
                        cname=data['body'].get('data').get('cname'), state=data['body'].get('data').get('state'))

    if not res:

      db.session.add(bookmark)
      db.session.commit()

    return bookmark_schema.dump(bookmark), 201

def delete_bookmark(data):
    """Delete Bookmark"""
    res = db.session.query.with_entities(Bookmark.id, Bookmark.cname) \
        .filter(Bookmark.id == data['body'].get('id') and Bookmark.cname == data['body'].get('cname')).first()

    if not res:
        return 'fail', 404

    for r in res:
        db.session.delete(r)
        db.session.commit()
 