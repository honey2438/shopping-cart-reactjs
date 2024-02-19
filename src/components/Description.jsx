import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Alert from "./Alert";
import BackButton from "./BackButton";
import { useCallback } from "react";
import axios from "axios";
import {get_token} from "../services/get_token";
import {getConfig} from "../config/getConfig";

function Description() {
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");
  const param = useParams();
  const config = getConfig();
  const add_product_url=config.add_product_url;

  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${param.id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json)).catch((e) => {
        setToggle(true);
        setMessage("Network Error");
        console.log(e);
      });
  }, []);
  console.log(product);
  
  const manageToggle=useCallback(()=>{ 
    setToggle(false);
  }
  ,[toggle]);

  function addToCart(id) {
    axios.post(add_product_url, {"id": id}, {
    headers: {
        'Authorization': get_token()
    }}).then((res) => {
        // get the message from the server
        setMessage(res.data.message);
        setToggle(true);
     
    }
  ).catch((e) => {
    setToggle(true);
    setMessage("Please Login!");
    console.log(e);   
  }
  );
  }

  return (
    <div>
      <BackButton />
      <Alert toggle={toggle} manageToggle={manageToggle} message={message} />
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
