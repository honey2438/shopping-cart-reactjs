from .import db
from sqlalchemy import text,func

class User(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(150))
    email=db.Column(db.String(150),unique=True)
    password=db.Column(db.String(150))
    db.relationship('Products')
    db.relationship('RegisterSession')
    
class Products(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    product_id=db.Column(db.Integer,unique=True)
    quantity=db.Column(db.Integer)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))
    
    
class RegisterSession(db.Model):
    id =db.Column(db.Integer,primary_key=True)
    end_time = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))
