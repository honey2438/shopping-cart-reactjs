from flask import Blueprint,jsonify,request
from .models import Products,User
from . import db
from flask_jwt_extended import jwt_required,get_jwt_identity
from flask_bcrypt import Bcrypt

bcrypt=Bcrypt()


products_app=Blueprint("products_app",__name__)


@products_app.route("/cart",methods=["GET"])
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
    


@products_app.route("/add-product",methods=["POST"])
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


@products_app.route("/delete-product",methods=["POST"])
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