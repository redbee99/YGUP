from sqlalchemy import and_
from backend import db
from backend.bookmark.models import Bookmark
from backend.company.models import Company
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
    data['body'].update(bkno)

    #res = db.session.query(Bookmark).filter(and_(Bookmark.id == data['body'].get('id'),
     #                                            Bookmark.cname == data['body'].get('cname'))).first()
    bookmark = Bookmark(bkno=data['body'].get('bkno'), id=data['body'].get('id'),
                        cname=data['body'].get('cname'), state=data['body'].get('state'))

    db.session.add(bookmark)
    db.session.commit()

    return bookmark_schema.dump(bookmark), 201

def delete_bookmark(data):
    """Delete Bookmark"""
    res = db.session.query(Bookmark).filter(and_(Bookmark.id == data['body'].get('id'), Bookmark.cname == data['body'].get('cname'))).all()

    if not res:
        return 'fail', 404

    for r in res:
        db.session.delete(r)
        db.session.commit()

def userpage_read_bookmark(data):
    """Userpage Read Bookmark"""
    subquery = db.session.query(Bookmark.cname).filter(Bookmark.id == data['id']).subquery()
    mainquery = db.session.query(Company).filter(Company.cname.in_(subquery))
    result = {}
    i=0
    for data in mainquery:
        temp = {}
        temp['cname'] = data.cname
        temp['address'] = data.address
        temp['keyword'] = data.keyword
        temp['logo_url'] = data.logo_url
        temp['info'] = data.info
        result[str(i)] = temp
        i+=1

    return result, 200

def infopage_read_bookmark(data):
    """Userpage Read Bookmark"""
    subquery = db.session.query(Bookmark.cname).filter(Bookmark.id == data['id']).subquery()
    mainquery = db.session.query(Company).filter(Company.cname.in_(subquery))
    result = {}
    i=0
    for data in mainquery:
        temp = {}
        temp['cname'] = data.cname
        temp['address'] = data.address
        temp['keyword'] = data.keyword
        temp['logo_url'] = data.logo_url
        temp['info'] = data.info
        result[str(i)] = temp
        i+=1

    return result, 200

def read_bookmark(data):
    """Read Bookmark"""
    bookmark = db.session.query(Bookmark).filter(and_(Bookmark.id == data['body'].get('id'), Bookmark.cname == data['body'].get('cname'))).first()
    if not bookmark:
        return 'error', 404

    else :
        return 'bookmark_button_on', 200

def read_bookmark1(data):
    """Read Bookmark1"""
    bookmark = db.session.query(Bookmark).filter(and_(Bookmark.id == data['body'].get('id'), Bookmark.cname == data['body'].get('cname'))).first()
    if not bookmark:
        return 'error', 404

    else:
        return 'bookmark_button_on', 200
