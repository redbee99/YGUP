from backend import db

Column = db.Column
Model = db.Model

class Cover_letter(Model):
    __tablename__ = "cover_letter"

    clno = Column(db.Integer, primary_key=True)
    id = Column(db.String(20), nullable=False)
    cname = Column(db.String(100), nullable=False)
    content_1 = Column(db.Text)
    content_2 = Column(db.Text)
    content_3 = Column(db.Text)
    wdate = Column(db.DateTime)
    clname = Column(db.String(100), nullable=False)




    def __init__(self, clno, id, cname, content_1, content_2, content_3, wdate, clname):
        self.clno = clno
        self.id = id
        self.cname = cname
        self.content_1 = content_1
        self.content_2 = content_2
        self.content_3 = content_3
        self.wdate = wdate
        self.clname = clname

