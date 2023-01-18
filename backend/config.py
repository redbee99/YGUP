class Config:
    TESTING = False
    SECRET_KEY = "supersecret"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "mysql://root:1234@localhost/ygup?charset=utf8"

class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "mysql://root:1234@localhost/ygup?charset=utf8"

class ProductConfig(Config):
    SQLALCHEMY_DATABASE_URI = "mysql://root:1234@localhost/ygup?charset=utf8"