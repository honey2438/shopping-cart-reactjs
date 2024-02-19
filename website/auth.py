from flask import Blueprint,request,jsonify,session
from . import db
from .models import User
from flask_jwt_extended import  create_access_token,unset_jwt_cookies,jwt_required,get_jwt_identity
from flask_bcrypt import Bcrypt
import time
bcrypt = Bcrypt()


auth=Blueprint('auth',__name__)

@auth.route("/login",methods=["POST","GET"])
def login():
    if request.method=="POST":
        email=request.json["email"]
        password=request.json["password"]
        
        if len(email)<4:
            return jsonify({"status":"error","message":"length of email shall be greater than 4"}),422
        elif len(password)<6:
            return jsonify({"status":"error","message":"length of password shall be greater than 6"}),422
        else:
            user=User.query.filter_by(email=email).first()
            if user:
                check_pswd=bcrypt.check_password_hash(user.password,password)
                if check_pswd:
                    # login_user(user,remember=True)
                    # session['last_activity']=time.time()
                    access_token = create_access_token(identity=user.id)
                    response = jsonify({"status":"success","message":"login successful!","authorization":access_token})
                    return response,200
                    
                return jsonify({"status":"error","message":"unauthenticated user!"}),401
            else:
                return jsonify({"status":"error","message":"user not found!"}),401
            
    
    return jsonify({"status":"error","message":"please login!"}),401
            

@auth.route("/signup",methods=["POST"])
def signup():
    if request.method=="POST":
        name=request.json["name"]
        email=request.json["email"]
        password1=request.json["password1"]
        password2=request.json["password2"]
        
        if len(name)<1:
            return jsonify({"status":"error","message":"name shall be greater than 1"}),422
        elif len(email)<4:
            return jsonify({"status":"error","message":"length of email shall be greater than 4"}),422
        elif len(password1)<6:
            return jsonify({"status":"error","message":"length of password shall be greater than 6"}),422
        elif not password1==password2:
            return jsonify({"status":"error","message":"passwords does not match"}),422
        
        user=User.query.filter_by(email=email).first()
        if user:
            jsonify({"status":"error","message":"user already exists please login"}),409
        else:   
            user=User(name=name,email=email,password=bcrypt.generate_password_hash(password1).decode('utf-8'))
            db.session.add(user)
            db.session.commit()
            return jsonify({"status":"success","message":"account created successfully!"}),200
         
    
@auth.route("/logout")
@jwt_required()
def logout():
    # logout_user()
    response=jsonify({"status":"success","message":"user logged out!"})
    unset_jwt_cookies(response)
    return response,200


@auth.route("/is-authenticated")
@jwt_required()
def isAuthenticated():
    if get_jwt_identity():
        return jsonify({"status":"success","message":"authenticated"}),200
    else:
        return jsonify({"status":"error","message":"unauthenticated"}),401

        

                    
                    
