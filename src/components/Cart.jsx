import React, { useEffect, useRef } from "react";
import "../App.css";
import Alert from "./Alert";
import { useState } from "react";
import CartShimmer from "./CartShimmer";

function Cart() {
let effect =useRef(false);
  const [products, setProducts] = useState([]);
  let cartProducts = JSON.parse(localStorage.getItem("cart"));
  
    useEffect(() => {
      console.log("running")
        if(!effect.current){
         cartProducts.forEach(element => {
            fetch(`https://fakestoreapi.com/products/${element.id}`)
            .then((res) => res.json())
            .then((json) => {
                json.quantity=element.quantity;
                setProducts((products) => [...products, json]);
                }
            );
         });
            effect.current=true;
    }
},[]);
  
//   console.log(products);

  function deleteItem(id) {
  setToggle({display:"flex"});
      cartProducts = cartProducts.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      setProducts(products.filter((item) => item.id !== id));
  }

  const [toggle, setToggle] = useState({display:"none"});
  useEffect(() => {
    if(toggle.display==="none") return;
    const timer = setTimeout(() => {
      setToggle({display:"none"});
    }, 1000);
    return () => clearTimeout(timer);
  }, [toggle]);

  let totalAmount=products.reduce((acc,curr)=>{
    return acc+curr.price*curr.quantity;
},0);
if(products.length===0)return <CartShimmer/>;
  return (
    <div className="cart-box">
      <Alert style={toggle} message="Item deleted!"/>
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
              <button className="delete-btn" onClick={()=>deleteItem(item.id)}>
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
