from backend import db

Column = db.Column
Model = db.Model

#usertype table
class UserType(Model):
    __tablename__ = "user_type"

    uno = Column(db.Integer, primary_key=True)
    type = Column(db.String(20), nullable=False)

    def __init__(self, uno, type):
        self.uno = uno
        self.type = type