from backend import db
from backend.user.models import User
from backend.user.schemas import user_schema
from sqlalchemy import and_
import json
def create_user(data):
    """Given serialized data and create a ner User"""
    if not len(data['id']) >= 4 and len(data['id']) <= 10:
        return 'please id rule check', 500

    if not len(data['password']) >= 5 and len(data['password']) <= 15:
        return 'please password rule check', 500

    user = user_schema.load(data)
    db.session.add(user)
    db.session.commit()
    return user_schema.dump(user), 201

def login_user(data):
    """Login User"""
    if not db.session.query(User).filter(and_(User.id == data['body'].get('id'), User.password == data['body'].get('pw') )).all():
        return 'fail', 404

    return 'OK', 200

def delete_user(data):
    """Delete User"""
    res = db.session.query(User).filter(and_(User.id == data['id'], User.password == data['password'])).all()

    if not res:
        return 'fail', 404

    for r in res:
        db.session.delete(r)
        db.session.commit()

    return 'Delete OK', 200

def update_user(data):
    """Update User"""
    res = db.session.query(User).filter(User.id == data['id']).update(
        {"id": data['id'], "password": data['password'], "email": data['email'], "name": data['name']})

    if not res:
        return 'fail', 404

    db.session.commit()

    return 'Update OK', 200

def search_id(data):
    """search id"""
    res = db.session.query(User).filter(and_(User.name == data['body'].get('name'), User.email == data['body'].get('email'))).first()
    if not res:
        return 'fail', 404

    result= {
        'id': res.id
    }
    return result, 200

def search_pw(data):
    """search pw"""
    res = db.session.query(User).filter(and_(User.id == data['body'].get('id'), User.name == data['body'].get('name'), User.email == data['body'].get('email'))).first()

    if not res:
        return 'fail', 404

    result= {
        'pw': res.password
    }
    return result, 200

def check_overlap_id(data):
    """Check Overlap Id"""
    res = db.session.query(User).filter(User.id == data['body'].get('id')).first()

    if not res:
        return 'OK', 200

    return 'fail', 200