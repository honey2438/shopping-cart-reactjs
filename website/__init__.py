from flask import Flask,session,redirect,url_for
from flask_sqlalchemy import SQLAlchemy
import os
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
import time

db=SQLAlchemy()
DB_NAME="shopping.db"

def create_app():
    app=Flask(__name__)
    app.config['SECRET_KEY']="asdba"
    app.config['SQLALCHEMY_DATABASE_URI']=f"sqlite:///{DB_NAME}"
    db.init_app(app)
    
    from .products_api import products_app
    from .user_api import user_app
    from .auth import auth

    app.register_blueprint(products_app,url_prefix='/products')
    app.register_blueprint(user_app,url_prefix='/user')
    app.register_blueprint(auth,url_prefix='/auth')
    
    jwt=JWTManager(app)

    
    from .models import User,Products,RegisterSession
    
    create_database(app)

    return app


def create_database(app):
    if not os.path.exists('website/'+DB_NAME):
        with app.app_context():
            db.create_all()
        print("database created!")
    
    
    
    
    
    