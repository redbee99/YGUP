from backend import ma
from backend.cover_letter.models import Cover_letter

class Cover_letterSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cover_letter
        load_instance = True
        ordered = True

cover_letter_schema = Cover_letterSchema() # User
cover_letter_list_schema = Cover_letterSchema(many=True) #list 뽑아올때 User[]