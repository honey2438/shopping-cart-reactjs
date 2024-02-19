import React from "react";
import logo from "../Amazon-logo-meaning.jpg";
import { Link } from "react-router-dom";
import { IsAuthenticated } from "../services/IsAuthenticated"; 
import { useEffect, useState } from "react";


function Navbar() {
  const [authenticated, setAuthenticated] = useState(false);
  
  

useEffect(() => {
  const checkAuthentication = async () => {
    if (await IsAuthenticated()) {
      setAuthenticated(true);
      console.log('Authenticated');
    }
    else{
      console.log('Not Authenticated');
    }
  };

  checkAuthentication();
}, []);


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
        {/* <li>
          <Link to="/contact">Contact</Link>
        </li> */}
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {!authenticated && (
        <li>
          <Link to="/login">Login</Link>
        </li>
        )}
        {authenticated && (
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        )}
        
      </ul>
    </nav>
  );
}
export default Navbar;
