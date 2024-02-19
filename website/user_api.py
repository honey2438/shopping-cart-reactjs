from flask import Blueprint,jsonify,request
from .models import Products,User
from . import db
from flask_jwt_extended import jwt_required,get_jwt_identity
from flask_bcrypt import Bcrypt
bcrypt=Bcrypt()

user_app=Blueprint("user_app",__name__)

@user_app.route("/getuser")
@jwt_required()
def getUser():
    current_user_id = get_jwt_identity()
    user=User.query.filter_by(id=current_user_id).first()
    if user:
        print(user)
        user_details={"name":user.name,"email":user.email}
        return jsonify({"status":"success","message":"user fetched","data":user_details}),200
    else:
        return jsonify({"status":"error","message":"user not found"}),402
    
@user_app.route("/update-user",methods=["POST"])
@jwt_required()
def updateUser():
    if request.method=="POST":
        current_user_id = get_jwt_identity()
        # print(current_user_id)
        user=User.query.filter_by(id=current_user_id).first()
        fields_to_update=request.json["update_field"]
        if not user==None:
            # print(user)
            for field in fields_to_update:
                if field=="email":
                    email=request.json["email"]
                    user.email=email
                    db.session.commit()
                    print('email updated')
                elif field=="name":                 
                    name=request.json["name"]
                    # print("name:",name)
                    user.name=name
                    db.session.commit()
                    print('name updated')
                elif field=="password":       
                    old_password=request.json["password"]
                    new_password=request.json["new_password"]
                    check_pswd=bcrypt.check_password_hash(user.password,old_password)
                    if check_pswd:
                        user.password=bcrypt.generate_password_hash(new_password).decode('utf-8')
                        db.session.commit()
                        print('password updated')
                    else:
                        return jsonify({"status":"error","message":"wrong password!"}),401
        else:
            return jsonify({"status":"error","message":"user not found!"}),402
        
        return jsonify({"status":"success","message":"updated successfully!"}),200
                    
@user_app.route("/delete-user")
@jwt_required()
def deleteUser():
    current_user_id = get_jwt_identity()
    user=User.query.filter_by(id=current_user_id)
    if not user==None:
        db.session.delete(user)
        db.session.commit()
    # logout_user()
    return jsonify({"status":"success","message":"account deleted successfully!"}),200