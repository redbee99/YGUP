from backend import db

Column = db.Column
Model = db.Model

class Cover_letter(Model):
    __tablename__ = "cover_letter"

    content_1 = Column(db.Text, nullable=False)
    content_2 = Column(db.Text, nullable=False)
    content_3 = Column(db.Text, nullable=False)
    wdate = Column(db.DateTime)
    bkno = Column(db.Integer, nullable=False)
    id = Column(db.String(20), nullable=False)
    cno = Column(db.String(50), nullable=False)
    clno = Column(db.Integer, primary_key=True)

    def __init__(self, content_1, content_2, content_3, wdate, bkno, id, cno, clno):
        self.content_1 = content_1
        self.content_2 = content_2
        self.content_3 = content_3
        self.wdate = wdate
        self.bkno = bkno
        self.id = id
        self.cno = cno
        self.clno = clno

