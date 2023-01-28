from backend import db
from backend.user.models import User
from backend.user_type.models import UserType
from backend.user.schemas import user_schema
from sqlalchemy import and_
import re

def create_user(data):
    """Given serialized data and create a ner User"""
    if not len(data['id']) >= 4 and len(data['id']) <= 10:
        return 'please id rule check', 505

    if not len(data['password']) >= 5 and len(data['password']) <= 15:
        return 'Check the password length', 505

    if not re.findall('[0-9]+', data['password']) and not re.findall('[a-z]', data['password']) or not re.findall('[A-Z]', data['password']) :
        return 'please password rule check', 505

    if not re.findall('[`~!@#$%^&*(),<.>/?]+', data['password']):
        return 'At least 1 special character required', 505

    if not data['password'] == data['chk_pwd']:
        return 'password and chk_pwd do not match', 505

    del data["chk_pwd"]
    data["uno"] = 1
    user = user_schema.load(data)
    db.session.add(user)
    db.session.commit()
    return user_schema.dump(user), 201

def login_user(data):
    """Login User"""
    if not db.session.query(User).filter(and_(User.id == data['body'].get('id'), User.password == data['body'].get('pw'))).all():
        return 'fail', 505

    return 'OK', 200

def delete_user(data):
    """Delete User"""
    res = db.session.query(User).filter(and_(User.id == data['body'].get('id'), User.password == data['body'].get('pw'))).all()

    if not res:
        return 'fail', 505

    for r in res:
        db.session.delete(r)
        db.session.commit()

    return 'Delete OK', 200

def update_user(data):
    """Update User"""
    res = db.session.query(User).filter(User.id == data['id']).update(
        {"email": data['email'], "name": data['name']})

    if not res:
        return 'fail', 505

    pw = db.session.query(User).filter(User.password == data['password']).all()

    if not pw :
        return 'pwd fail', 505

    db.session.commit()

    return 'Update OK', 200

def pwupdate_user(data):
    """Pwupdate User"""
    res = db.session.query(User).filter(and_(User.id == data['id'], User.password == data['password'],
                                             data['new_pwd'] == data['new_pwd_chk'])).update({"password": data['new_pwd']}, synchronize_session=False)

    if not len(data['new_pwd']) >= 5 and len(data['new_pwd']) <= 15:
        return 'Check the password length', 505

    if not re.findall('[0-9]+', data['new_pwd']) and not re.findall('[a-z]', data['new_pwd']) or not re.findall('[A-Z]', data['new_pwd']) :
        return 'please password rule check', 505

    if not re.findall('[`~!@#$%^&*(),<.>/?]+', data['new_pwd']):
        return 'At least 1 special character required', 505

    if not data['new_pwd'] == data['new_pwd_chk'] :
        return 'new_pwd and new_pwd_chk do not match', 505

    if not res:
        return 'fail', 505

    db.session.commit()

    return 'Pwupdate OK', 200

def search_id(data):
    """search id"""
    res = db.session.query(User).filter(and_(User.name == data['body'].get('name'), User.email == data['body'].get('email'))).first()
    if not res:
        return 'fail', 505

    result= {
        'id': res.id
    }
    return result, 200

def search_pw(data):
    """search pw"""
    res = db.session.query(User).filter(and_(User.id == data['body'].get('id'), User.name == data['body'].get('name'), User.email == data['body'].get('email'))).first()

    if not res:
        return 'fail', 505

    result= {
        'pw': res.password
    }
    return result, 200

def check_overlap_id(data):
    """Check Overlap Id"""
    res = db.session.query(User).filter(User.id == data['body'].get('id')).all()

    if not res:
        return 'OK', 200

    return 'fail', 505

def read_user(data):
    """Read User"""
    res = db.session.query(User).filter(User.id == data['body'].get('id')).all()
    if not res:
        return 'fail', 505

    result = {}

    for data in res:
        temp = data.__dict__
        del temp['_sa_instance_state']
        del temp['password']
        del temp['uno']
        result[temp.get('id')] = temp

    return result, 200

def read_all_users(data):
    """Read All Users"""
    user_type = db.session.query(UserType).filter(UserType.uno == data['uno']).first()
    if user_type is None or user_type.type != 'admin':
        return {"message": f"only admin can read"}, 505

    res = db.session.query(User).all()

    if not res:
        return 'fail', 505

    result = {}

    for data in res:
        temp = data.__dict__
        del temp['_sa_instance_state']
        del temp['password']
        result[temp.get('id')] = temp

    return result, 200

def delete_user_admin(data):
    """Delete User Admin"""
    user_type = db.session.query(UserType).filter(UserType.uno == data['uno']).first()
    if user_type is None or user_type.type != 'admin':
        return {"message": f"only admin can delete"}, 505

    res = db.session.query(User).filter(User.id == data['id']).all()

    if not res:
        return 'fail', 505

    for r in res:
        db.session.delete(r)
        db.session.commit()

    return 'Delete OK', 200

def check_overlap_email(data):
    """Check Overlap Email"""
    res = db.session.query(User).filter(User.email == data['email']).all()

    if not res :
        return 'OK', 505

    return 'fail', 200