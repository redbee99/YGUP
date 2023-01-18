class Config:
    TESTING = False
    SECRET_KEY = "supersecret"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "mysql://root:12345678@ec2-3-35-22-105.ap-northeast-2.compute.amazonaws.com/ygup?charset=utf8"

class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "mysql://root:12345678@ec2-3-35-22-105.ap-northeast-2.compute.amazonaws.com/ygup?charset=utf8"

class ProductConfig(Config):
    SQLALCHEMY_DATABASE_URI = "mysql://root:12345678@ec2-3-35-22-105.ap-northeast-2.compute.amazonaws.com/ygup?charset=utf8"