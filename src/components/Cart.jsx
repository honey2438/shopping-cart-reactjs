import React, { useEffect, useRef } from "react";
import "../App.css";
import Alert from "./Alert";
import { useState } from "react";
import CartShimmer from "./CartShimmer";
import BackButton from "./BackButton";

function Cart() {
  let effect = useRef(true);
  const [products, setProducts] = useState([]);
  let cartProducts = [];
  if (localStorage.getItem("cart") !== null) {
    cartProducts = JSON.parse(localStorage.getItem("cart"));
    effect.current = false;
  }

  useEffect(() => {
    console.log("running");
    if (!effect.current) {
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
      effect.current = true;
    }
  }, []);

  //   console.log(products);


  function manageToggle() {
    setToggle(true);
    setTimeout(() => {
      setToggle(false);
    }, 2000);
  }

  function deleteItem(id) {
    manageToggle();
    cartProducts = cartProducts.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    setProducts(products.filter((item) => item.id !== id));
  }

  const [toggle, setToggle] = useState(false);

  let totalAmount = products.reduce((acc, curr) => {
    return acc + curr.price* curr.quantity;
  }, 0);
  if (products.length === 0 && cartProducts.length !== 0)
    return <CartShimmer />;
  return (
    <div className="cart-box">
      <BackButton />
      <Alert toggle={toggle} message="Item deleted!" />
      <h1>Cart</h1>
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
  );
}

export default Cart;
