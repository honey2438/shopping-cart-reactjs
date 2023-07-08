import React from "react";
import logo from "../Amazon-logo-meaning.jpg";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
