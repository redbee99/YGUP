from backend import db

Column = db.Column
Model = db.Model

#user table
class User(Model):
    __tablename__ = "user"

    id = Column(db.String(20), primary_key=True)
    email = Column(db.String(50), nullable=False)
    name = Column(db.String(20), nullable=False)
    password = Column(db.String(20), nullable=False)

    def __init__(self, id, email, name, password):
        self.id = id
        self.email = email
        self.name = name
        self.password = password

    def __repr__(self):
        return f"<User {self.id} - {self.email}>"