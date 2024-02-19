import React, { useEffect, useRef } from "react";
import "../App.css";
import Alert from "./Alert";
import { useState } from "react";
import CartShimmer from "./CartShimmer";
import BackButton from "./BackButton";
import { useCallback } from "react";
import axios from "axios";
import { get_token } from "../services/get_token";
import {getConfig} from "../config/getConfig";


function Cart() {
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [shimmer, setShimmer] = useState(true);
  const [message, setMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  const config = getConfig();
  const cart_url=config.cart_url;
  const delete_product_url=config.delete_product_url;

  useEffect(() => {
    
    console.log("Hello")
    setShimmer(true);
      
      axios
        .get(cart_url, {
          headers: { Authorization: get_token() },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.data);
            setCartProducts(res.data.data);
          } else {
            toggle(true);
            setMessage(res.data.message);
          }
          
        })
        .catch((e) => {
          // console.log(get_token());
          setToggle(true);
          setMessage("Please Login!");
          console.log(e.message);
        });
    
  }, []);

  useEffect(() => {
    if (cartProducts.length !== 0) {
      console.log("second hello");
      cartProducts.forEach((element) => {
        function fetchProducts() {
          fetch(`https://fakestoreapi.com/products/${element.id}`)
            .then((res) => res.json())
            .then((json) => {
              setProducts((products) => [...products, json]);
              
             
            }).catch((e) => {
              setToggle(true);
              setMessage("Network Error");
              console.log(e);
            });
            
        }
        fetchProducts();
        
      });
      setShimmer(false);
    }
    else{
      setShimmer(false);
    }
    
  }, [cartProducts]);


  const manageToggle = useCallback(() => {
    setToggle(false);
  }, []);

  function deleteItem(id) {
    axios
      .post(
        delete_product_url,
        { id: id },
        { headers: { Authorization: get_token() } }
      )
      .then((res) => {
        setToggle(true);
        setMessage(res.data.message);
        if (res.status === 200) {
          setProducts((products) => {
            return products.filter((item) => item.id !== id);
          });
          
        }
      }).catch((e) => {
        setToggle(true);
        setMessage("Product does not exist!");
        console.log(e);
      });
  }
  useEffect(() => {
  const calculateTotalAmount=()=>{
    let total=0;

    products.forEach((item)=>{
      total+=item.price*cartProducts.find((it) => it.id === item.id).quantity;
    });
    // console.log(total)
    setTotalAmount(total);
  }
  calculateTotalAmount();
  }
  ,[products,cartProducts]);

  return (
    <div className="flex-column">
      <BackButton />
      <Alert toggle={toggle} manageToggle={manageToggle} message={message} />
      <h1>Cart</h1>
      {shimmer === true ? (
        <CartShimmer />
      ) : products.length === 0 ? (
        <div>
          <h3>Cart is empty</h3>
        </div>
      ) : (
        <div className="cart-box">
          <div className="products-list">
            {products.map((item) => {
              return (
                <div className="product-row" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="title">{item.title}</div>
                  <div className="price">$ {item.price}</div>
                  <div className="quantity">
                    {cartProducts.find((it) => it.id === item.id).quantity}
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
          <div className="order">
            <div className="total">Total: $ {totalAmount.toFixed(2)} </div>
            <button className="order-btn">Order</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
