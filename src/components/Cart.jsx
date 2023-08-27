import React, { useEffect, useRef } from "react";
import "../App.css";
import Alert from "./Alert";
import { useState } from "react";
import CartShimmer from "./CartShimmer";
import BackButton from "./BackButton";
import { useCallback } from "react";

function Cart() {
  let effect = useRef(true);
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [shimmer, setShimmer] = useState(true);

  let cartProducts = [];
  if (localStorage.getItem("cart") !== null) {
    cartProducts = JSON.parse(localStorage.getItem("cart"));
    effect.current = false;
  }

  useEffect(() => {
    console.log("running");
    if (!effect.current) {
      setShimmer(true);
      new Promise((resolve, reject) => {
        cartProducts.forEach((element) => {
          function fetchProducts() {
            fetch(`https://fakestoreapi.com/products/${element.id}`)
              .then((res) => res.json())
              .then((json) => {
                json.quantity = element.quantity;
                setProducts((products) => [...products, json]);
              });
          }
          fetchProducts();
        });
        setTimeout(() => {
          resolve();
        }, 500);
      }).then(() => {
        setShimmer(false);
      });
    }
    effect.current = true;
  }, []);

  //   console.log(products);

  const manageToggle = useCallback(() => {
    setToggle(false);
  }, [toggle]);

  function deleteItem(id) {
    setToggle(true);
    cartProducts = cartProducts.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    setProducts(products.filter((item) => item.id !== id));
  }

  let totalAmount=0;
  if (products.length !== 0) {
    totalAmount = products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }

  return (
    <div className="flex-column">
      <BackButton />
      <Alert
        toggle={toggle}
        manageToggle={manageToggle}
        message="Item deleted!"
      />
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
