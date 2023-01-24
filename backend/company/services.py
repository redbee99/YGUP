from backend import db
from backend.company.models import Company
from backend.company.schemas import company_schema
import uuid
from backend.user_type.models import UserType


def create_company(data):
    """Given serialized data and create a ner Company"""
    usertype = db.session.query(UserType).filter(UserType.type == data['uno']).first()
    if usertype is None or usertype.type != 'admin':
        return {"message": f"only admin can create"}, 505

    data['cno'] = str(uuid.uuid1())
    #북마크 테이블이 완성 되면 북마크 조회해서 값 채워 넣기
    company = Company(cname=data['cname'], cno=data['cno'], keyword=data['keyword'],
    wcloud=data['wcloud'],wcloud_url=data['wcloud_url'],address=data['address'],
    sales=data['sales'], owner=data['owner'],info=data['info'],pay=data['pay'],
    courl=data['courl'], logo=data['logo'], logo_url=data['logo_url'],
    resign=data['resign'], form=data['form'], bookmarkcnt=data['bookmarkcnt'],
    readcnt=data['readcnt'])
    db.session.add(company)
    db.session.commit()
    return company_schema.dump(company), 201

def update_company(data):
    """Update company"""
    usertype = db.session.query(UserType).filter(UserType.type == data['uno']).first()
    if usertype is None or usertype.type != 'admin':
        return {"message": f"only admin can update"}, 505

    res = db.session.query(Company).filter(Company.cname == data['cname']).update(
        {"cname": data['cname'], "keyword": data['keyword'], "wcloud": data['wcloud'], "wcloud_url": data['wcloud_url'], "address": data['address'], "sales": data['sales'], "owner": data['owner'], "info": data['info'], "pay": data['pay'], "courl": data['courl'], "logo": data['logo'], "logo_url": data['logo_url'], "resign": data['resign'], "form": data['form'], "bookmark": data['bookmark'], "readcnt":data['readcnt'] })

    if not res:
        return 'fail', 505

    db.session.commit()

    return 'Update OK', 200

def delete_company(data):
    """Delete Company"""
    usertype = db.session.query(UserType).filter(UserType.type == data['uno']).first()
    if usertype is None or usertype.type != 'admin':
        return {"message": f"only admin can delete"}, 505

    res = db.session.query(Company).filter(Company.cname == data['cname']).all()

    if not res:
        return 'fail', 505

    for r in res:
        db.session.delete(r)
        db.session.commit()

def read_all_company(data):
    """Read All Company"""
    usertype = db.session.query(UserType).filter(UserType.type == data['uno']).first()
    if usertype is None or usertype.type != 'admin':
        return {"message": f"only admin can read"}, 505

    company = db.session.query(Company).with_entities(Company.cname, Company.address, Company.keyword)

    if not company:
        return 'fail', 505

    result = {}

    for data in company:
        temp = data.__dict__
        result[temp.get('id')] = temp

    return result, 200