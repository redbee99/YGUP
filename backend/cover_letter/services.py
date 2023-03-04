from backend import db
from backend.user.models import User
from backend.company.models import Company
from backend.cover_letter.models import Cover_letter
from backend.cover_letter.schemas import cover_letter_schema
from sqlalchemy import and_
import uuid
import konlpy
from collections import Counter

def create_cover_letter(data):
    """Given serialized data and create cover_letter"""
    clno = {'clno': str(uuid.uuid1())}
    data['body'].update(clno)

    cover_letter = Cover_letter(clno=data['body'].get('clno'), id=data['body'].get('data').get('id'),
                        cname=data['body'].get('data').get('cname'), content_1=data['body'].get('data').get('content1'),
                        content_2=data['body'].get('data').get('content2'), content_3=data['body'].get('data').get('content3'),
                        wdate=data['body'].get('data').get('wdate'), clname=data['body'].get('data').get('clname'))

    db.session.add(cover_letter)
    db.session.commit()

def update_cover_letter(data):
    """Update cover_letter"""
    res = db.session.query(Cover_letter).filter(Cover_letter.id == data['body'].get('data').get('id'),
                                    Cover_letter.clno == data['body'].get('data').get('clno')).update(
        {
        "cname": data['body'].get('data').get('cname'), "clname": data['body'].get('data').get('clname'),
        "content_1": data['body'].get('data').get('content1'), "content_2": data['body'].get('data').get('content2'),
        "content_3": data['body'].get('data').get('content3'),"wdate": data['body'].get('data').get('wdate'),
        }
    )
    if not res:
        return 'fail', 404

    db.session.commit()

    return 'Update OK', 200

def delete_cover_letter(data):
    """Delete Cover_letter"""

    res = db.session.query(Cover_letter).filter(Cover_letter.clno == data['body'].get('clno')).all()

    if not res:
        return 'fail', 404

    for r in res:
        db.session.delete(r)
        db.session.commit()

def read_all_cover_letter(data):
    """Read All Company"""
    user = db.session.query(Cover_letter).filter(Cover_letter.id == data['body'].get(id))
    if user is None :
        return {"message": "there's no such id of user"}, 501

    cover_letter = db.session.query(Cover_letter).with_entities(Cover_letter.cname, Cover_letter.clname,
    Cover_letter.wdate, Cover_letter.clno).all()

    if not cover_letter:
        return 'fail', 505

    result = {}

    for data in cover_letter:
        temp = {}
        temp['cname'] = data[0]
        temp['clname'] = data[1]
        temp['wdate'] = data[2].strftime("%Y년 %m월 %d일 %H시 %M분 %S초")
        temp['clno'] = data[3]
        result[data[3]] = temp

    return result, 201


def read_cover_letter(data) :
    """Read cover_letter"""

    keyword_list = db.session.query(Company.keyword).filter(Company.cname == data['body'].get('cname'))
    c_lst = str(list(keyword_list)[0]).replace("'", "").replace("(","").replace(")","").split(', ')
    #c_list2 = keyword_list[0]
    #c_list3 = str(c_list2).replace("'", "").replace("(","").replace(")","")
    #c_list4 = c_list3.split(', ')


    cover_letter = db.session.query(Cover_letter).filter(Cover_letter.clno == data['body'].get('clno'))

    if not cover_letter:
        return 'fail', 502

    result = {}

    for data in cover_letter:
        temp = data.__dict__
        del temp['_sa_instance_state']
        del temp['wdate']
        del temp['id']
        result['cover_letter'] = temp

    content=str(temp['content_1']+temp['content_2']+temp['content_3'])
    filtered_content = content.replace('.', '').replace(',', '').replace("'", "").replace('·', ' ').replace('=','').replace('\n', '')
    Okt = konlpy.tag.Okt()
    Okt_morphs = Okt.pos(filtered_content)
    Noun_words = []
    for word, pos in Okt_morphs:
        if pos == 'Noun':
            Noun_words.append(word)

    words = [n for n in Noun_words if len(n) > 1]
    c = Counter(words)

    mylist = []
    for i in c.most_common(30):
        mylist.append(i[0])


    new = []
    cnt = 0
    for i in c_lst:
        for j in mylist:
            if i == j:
                new.append(i)
                cnt += 1
    word = list(set(c_lst) - set(new))
    cnt1 = cnt/3*10

    return {'result':result,'cnt1':cnt1,'c_lst':c_lst,'new':new,'word':word,'cnt':cnt }, 200



