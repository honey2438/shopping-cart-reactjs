from flask import Blueprint,jsonify,request
from .models import Products,User
from . import db
from flask_jwt_extended import jwt_required,get_jwt_identity
from flask_bcrypt import Bcrypt

bcrypt=Bcrypt()


views=Blueprint("views",__name__)


@views.route("/cart",methods=["GET"])
@jwt_required()
def cart():
    current_user_id = get_jwt_identity()
    # print(current_user_id)
    user_products = Products.query.filter_by(user_id=current_user_id).all()
    print(user_products)
    if not user_products==None:
        product_ids=[{"id":user_product.product_id,"quantity":user_product.quantity} for user_product in user_products]
        return jsonify({"status":"success","message":"products fetched","data":product_ids}),200
    else:
        return jsonify({"status":"success","message":"products fetched","data":[]}),200
    


@views.route("/add-product",methods=["POST"])
@jwt_required()
def addProduct():
    if request.method=="POST": 
        current_user_id = get_jwt_identity()
        product_id=request.json["id"]
        # print("product_id:",product_id)
        product=Products(product_id=product_id,user_id=current_user_id,quantity=1)
        product_exists=Products.query.filter_by(user_id=current_user_id,product_id=product_id).first()
        # print(product_exists)
        if product_exists:
            product_exists.quantity=int(product_exists.quantity)+1
        else:
            db.session.add(product)
        db.session.commit()
        return jsonify({"status":"success","message":"product added successfully"}),200


@views.route("/delete-product",methods=["POST"])
@jwt_required()
def deleteProduct():
    if request.method=="POST": 
        current_user_id=get_jwt_identity()
        product_id=request.json["id"]
        product=Products.query.filter_by(product_id=product_id,user_id=current_user_id).first()
        if not product==None:
            db.session.delete(product)
            db.session.commit()
            return jsonify({"status":"success","message":"product deleted successfully"}),200
        return jsonify({"status":"error","message":"product does not exist"}),402

@views.route("/getuser")
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
    
@views.route("/update-user",methods=["POST"])
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
                    
@views.route("/delete-user")
@jwt_required()
def deleteUser():
    current_user_id = get_jwt_identity()
    user=User.query.filter_by(id=current_user_id)
    if not user==None:
        db.session.delete(user)
        db.session.commit()
    # logout_user()
    return jsonify({"status":"success","message":"account deleted successfully!"}),200