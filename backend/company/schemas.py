from backend import ma
from backend.company.models import Company

class CompanySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Company
        load_instance = True
        ordered = True

company_schema = CompanySchema()
company_list_schema = CompanySchema(many=True)