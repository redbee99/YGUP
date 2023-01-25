from backend import db
from backend.company.models import Company
from backend.company.schemas import company_schema
import uuid
from backend.user_type.models import UserType
from sqlalchemy import desc
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
    usertype = db.session.query(UserType).filter(UserType.uno == data['uno']).first()
    if usertype is None or usertype.type != 'admin':
        return {"message": f"only admin can read"}, 505

    company = db.session.query(Company).with_entities(Company.cname, Company.address, Company.keyword).all()

    if not company:
        return 'fail', 505

    result = {}

    for data in company:
        temp = {}
        temp['cname'] = data[0]
        temp['address'] = data[1]
        temp['keyword'] = data[2]
        result[data[0]] = temp

    return result, 200

def search_company(data):
    """Search Company"""
    cname_result = db.session.query(Company).with_entities(Company.cname, Company.address, Company.keyword).filter(Company.cname.like('%' + data['searchData'] + '%')).all()
    address_result = db.session.query(Company).with_entities(Company.cname, Company.address, Company.keyword).filter(Company.address.like('%' + data['searchData'] + '%')).all()
    keyword_result = db.session.query(Company).with_entities(Company.cname, Company.address, Company.keyword).filter(Company.keyword.like('%' + data['searchData'] + '%')).all()

    if not cname_result:
        cname_result = ""

    if not address_result:
        address_result = ""

    if not keyword_result:
        keyword_result = ""

    result = {}

    if cname_result != "":
        i = 0
        for data in cname_result:
            temp = {}
            temp['cname'] = data[0]
            temp['address'] = data[1]
            temp['keyword'] = data[2]
            result['cname_result' + str(i)] = temp
            i+=1

    if address_result != "":
        i = 0
        for data in address_result:
            temp = {}
            temp['cname'] = data[0]
            temp['address'] = data[1]
            temp['keyword'] = data[2]
            result['address_result' + str(i)] = temp
            i += 1

    if keyword_result != "":
        i = 0
        for data in keyword_result:
            temp = {}
            temp['cname'] = data[0]
            temp['address'] = data[1]
            temp['keyword'] = data[2]
            result['keyword_result' + str(i)] = temp
            i += 1

    return result, 200

def rank_company(data):
    """Rank Company"""
    if data['type'] == "bookmark":
        company_list = db.session.query(Company).with_entities(Company.cname, Company.address, Company.keyword).order_by(desc(Company.bookmarkcnt)).all()
    else:
        company_list = db.session.query(Company).with_entities(Company.cname, Company.address, Company.keyword).order_by(desc(Company.readcnt)).all()

    result = {}
    i = 0

    for company in company_list:
        if data['f_all'] == 0:
            if i < 5:
                temp = {}
                temp['cname'] = company[0]
                temp['address'] = company[1]
                temp['keyword'] = company[2]
                result['rank' + str(i)] = temp
                i += 1
        else:
            temp = {}
            temp['cname'] = company[0]
            temp['address'] = company[1]
            temp['keyword'] = company[2]
            result['rank' + str(i)] = temp
            i += 1

    return result, 200

def read_company(data) :
    """Read Company"""
    company = db.session.query(Company).filter(Company.cname == data['cname']).all()

    if not company:
        return 'fail', 505

    result = {}

    for data in company:
        temp = data.__dict__
        del temp['_sa_instance_state']
        del temp['cno']
        result[temp.get('cname')] = temp

    return result, 200