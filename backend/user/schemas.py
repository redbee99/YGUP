from backend import ma
from backend.user.models import User

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        ordered = True

user_schema = UserSchema() # User
user_list_schema = UserSchema(many=True) #list 뽑아올때 User[]