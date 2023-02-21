from backend import db
from backend.bookmark.models import Bookmark
from backend.company.models import Company
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


def read_bookmark(data):
    """Read Bookmark"""
    subquery = db.session.query(Bookmark.cname).filter(Bookmark.id == data['id']).all()

    result = {}

    for data in subquery:
        temp = {}
        temp['cname'] = data[0]
        result[data[0]] = temp

        result1 = {}

        for data1 in db.session.query.with_entities(Company.cname, Company.address, Company.keyword,
            Company.logo, Company.info).filter(Company.cname == temp['cname']).all():

            temp1 = {}
            temp1['cname'] = data1[0]
            temp1['address'] = data1[1]
            temp1['keyword'] = data1[2]
            temp1['logo'] = data1[3]
            temp1['info'] = data1[4]
            result1[data1[0]] = temp1

    return result1, 200


