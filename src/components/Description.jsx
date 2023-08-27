import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Alert from "./Alert";
import BackButton from "./BackButton";
import { useCallback } from "react";

function Description() {
  const [toggle, setToggle] = useState(false);
  const param = useParams();
  console.log(param);

  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${param.id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, []);
  console.log(product);
  
  const manageToggle=useCallback(()=>{ 
    setToggle(false);
  }
  ,[toggle]);

  function addToCart(id) {
    setToggle(true);
    console.log("added to cart");
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify([{ id: id, quantity: 1 }]));
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart.find((item) => item.id === id)) {
        cart.find((item) => item.id === id).quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cart.push({ id: id, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }
  

  return (
    <div>
      <BackButton />
      <Alert toggle={toggle} manageToggle={manageToggle} message="Item added to cart!" />
      <div key={product.id} className="product-container">
        <div className="image-container">
          <img src={product.image} alt="" srcset="" />
        </div>
        <div className="about-product">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <p>Rating: 5</p>
          <h2 className="product-price">$ {product.price}</h2>
          <button
            className="product-btn"
            onClick={() => {
              addToCart(product.id);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Description;
