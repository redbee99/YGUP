from backend import db
from backend.company.models import Company
from backend.user.models import User
from backend.company.schemas import company_schema, company_list_schema
from sqlalchemy import and_
import uuid

def create_company(data):
    """Given serialized data and create a ner Company"""
    user = db.session.query(User).filter(User.id == data['user_type']).first()
    if user is None or user.id != 'admin':
        return {"message": f"only admin can create"}, 202

    data['cno'] = str(uuid.uuid1())
    #북마크 테이블이 완성 되면 북마크 조회해서 값 채워 넣기
    company = Company(cno=data['cno'],cname=data['cname'],keyword=data['keyword'],
    wcloud=data['wcloud'],wcloud_url=data['wcloud_url'],address=data['address'],
    sales=data['sales'], owner=data['owner'],info=data['info'],pay=data['pay'],
    courl=data['courl'], logo=data['logo'], logo_url=data['logo_url'],
    resign=data['resign'], form=data['form'], bookmark=data['bookmark'],
    readcnt=data['readcnt'])
    db.session.add(company)
    db.session.commit()
    return company_schema.dump(company), 201

def update_company(data):
    """Update company"""
    user = db.session.query(User).filter(User.id == data['user_type']).first()
    if user is None or user.id != 'admin':
        return {"message": f"only admin can update"}, 202

    res = db.session.query(Company).filter(Company.cno == data['cno']).update(
        {"cno": data['cno'], "cname": data['cname'], "keyword": data['keyword'], "wcloud": data['wcloud'], "wcloud_url": data['wcloud_url'], "address": data['address'], "sales": data['sales'], "owner": data['owner'], "info": data['info'], "pay": data['pay'], "courl": data['courl'], "logo": data['logo'], "logo_url": data['logo_url'], "resign": data['resign'], "form": data['form'], "bookmark": data['bookmark'], "readcnt":data['readcnt'] })

    if not res:
        return 'fail', 404

    db.session.commit()

    return 'Update OK', 200

def delete_company(data):
    """Delete Company"""
    user = db.session.query(User).filter(User.id == data['user_type']).first()
    if user is None or user.id != 'admin':
        return {"message": f"only admin can delete"}, 202

    res = db.session.query(Company).filter(Company.cno == data['cno']).all()

    if not res:
        return 'fail', 404

    for r in res:
        db.session.delete(r)
        db.session.commit()