import React from "react";
import { useState, useEffect } from "react";
import ProductsShimmer from "./ProductsShimmer";
import Alert from "./Alert";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setFilteredProducts(json);
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

  function manageToggle() {
    setToggle(true);
    setTimeout(() => {
      setToggle(false);
    }, 2000);
  }

  function addToCart(id) {
    manageToggle();
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

  useEffect(() => {
    searchProducts();
  }, [search]);

  const [toggle, setToggle] = useState(false);

  if (products.length === 0) return <ProductsShimmer />;
  return (
    <>
      <Alert toggle={toggle} message="Item added to cart!" />

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
  );
}

export default Products;
