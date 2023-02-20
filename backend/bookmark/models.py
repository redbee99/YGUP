from backend import db

Column = db.Column
Model = db.Model

#bookmark table
class Bookmark(Model):
    __tablename__ = "bookmark"

    bkno = Column(db.String(200), primary_key=True)
    id = Column(db.String(20), nullable=False)
    cname = Column(db.String(100), nullable=False)
    state = Column(db.Integer, nullable=False)


    def __init__(self, bkno, id, cname, state):
        self.bkno = bkno
        self.id = id
        self.cname = cname
        self.state = state

