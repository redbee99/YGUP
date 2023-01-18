from backend import db

Column = db.Column
Model = db.Model

#bookmark table
class Bookmark(Model):
    __tablename__ = "bookmark"

    bkno = Column(db.Integer, primary_key=True)
    id = Column(db.String(20), nullable=False)
    cno = Column(db.String(50), nullable=False)


    def __init__(self, bkno, id, cno):
        self.bkno = bkno
        self.id = id
        self.cno = cno

