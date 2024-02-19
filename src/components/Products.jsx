import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import ProductsShimmer from "./ProductsShimmer";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import axios from "axios";
import { get_token } from "../services/get_token";
import {getConfig} from "../config/getConfig";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [shimmer, setShimmer] = useState(true);
  const [networkError, setnetworkError] = useState(false);
  const [message, setMessage] = useState("");
  let networkRef=useRef(false);

  const config = getConfig();
  const add_product_url=config.add_product_url;

  useEffect(() => {
    setShimmer(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setFilteredProducts(json);
        setShimmer(false);
      })
      .catch((e) => {
        setnetworkError(true);
        setMessage("Network Error");
      });
  }, []);
  
  const searchProducts = () => {
    if (search === "") {
      setFilteredProducts(products);
      return;
    }
    let data = products.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredProducts(data);
  };

  const manageToggle= (inp) => {
      setToggle(inp);
    }

  function addToCart(id) {
    axios.post(add_product_url, {"id": id}, {
    headers: {
        'Authorization': get_token()
    }}).then((res) => {
    // get the message from the server
    setToggle(true);
    setMessage(res.data.message);
    }).catch((e) => {
      setToggle(true);
      setMessage("Please Login!");
      console.log(e);
    });
  }

  useEffect(() => {
    searchProducts();
  }, [search]);

  return (
    <>
      <Alert toggle={toggle} manageToggle={manageToggle} message={message} />
      {shimmer===true?<ProductsShimmer />:(
        <>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="products-box">
        {filteredProducts.map((item) => {
          return (
            <div key={item.id} className="product-card">
              <Link to={`${item.id}`} className="flex-column">
                <div className="product-img">
                  <img src={item.image} alt="" />
                </div>
                <div className="product-details">
                  <h4>{item.title}</h4>
                  <p>Ratings: {item.rating.rate}</p>
                </div>
                <div className="price">
                  <h4>$ {item.price}</h4>
                </div>
              </Link>
              <div className="add-to-cart">
                <button
                  className="product-btn"
                  onClick={() => {
                    addToCart(item.id);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </>
      )
}
    </>
  );
}

export default Products;
