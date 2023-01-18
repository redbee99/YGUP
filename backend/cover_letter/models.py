from backend import db
import time

Column = db.Column
Model = db.Model
from sqlalchemy.dialects.mysql import LONGTEXT, DATETIME

#user table
class Cover_letter(Model):
    __tablename__ = "cover_letter"

    content_1 = Column(LONGTEXT, nullable=False)
    content_2 = Column(LONGTEXT, nullable=False)
    content_3 = Column(LONGTEXT, nullable=False)
    wdate = Column(DATETIME)
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

