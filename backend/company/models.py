from backend import db

Column = db.Column
Model = db.Model

#company table
class Company(Model):
    __tablename__ = "company"

    cno = Column(db.String(50), primary_key=True)
    cname = Column(db.String(100), unique=True)
    keyword = Column(db.String(100))
    wcloud = Column(db.String(100))
    wcloud_url = Column(db.String(100))
    address = Column(db.String(50))
    sales = Column(db.String(20))
    owner = Column(db.String(20))
    info = Column(db.String(4000))
    pay = Column(db.String(20))
    courl = Column(db.String(50))
    logo = Column(db.String(100))
    logo_url = Column(db.String(100))
    resign = Column(db.String(20))
    form = Column(db.String(100))
    bookmark = Column(db.Integer)
    readcnt = Column(db.Integer)

    def __init__(self, cno, cname, keyword, wcloud, wcloud_url, address, sales, owner,
                 info, pay, courl, logo, logo_url, resign, form, bookmark,readcnt):
        self.cno = cno
        self.cname = cname
        self.keyword = keyword
        self.wcloud = wcloud
        self.wcloud_url = wcloud_url
        self.address = address
        self.sales = sales
        self.owner = owner
        self.info = info
        self.pay = pay
        self.courl = courl
        self.logo = logo
        self.logo_url = logo_url
        self.resign = resign
        self.form = form
        self.bookmark = bookmark
        self.readcnt = readcnt