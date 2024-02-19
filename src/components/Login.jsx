import React from "react";
import { useState } from "react";
import Alert from "./Alert";
import BackButton from "./BackButton";
import { useCallback } from "react";
import axios from "axios";
import { setAuthToken } from "../services/setAuthToken";


function Login() {
  const initialState = {
    email: "",
    password:""
  };
  const [data, setData] = useState(initialState);
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");

  function reset(event) {
    event.preventDefault();
    setData(initialState);
  }

  const manageToggle=useCallback(()=>{ 
    setToggle(false);
  }
  ,[toggle]);

  function submitRequest(event) {
    setToggle(true);
    event.preventDefault();
    axios.post("http://127.0.0.1:5000/auth/login",data).then((res) => {
        // get the message from the server
        console.log(res.data.authorization);
        setAuthToken(res.data.authorization);
        setMessage(res.data.message);
        setToggle(true);
        // navigate to the home page
          window.location.href = "/";
        }).catch((e) => {
            setToggle(true);
            setMessage("Wrong Credentials!");
            console.log(e);
            });
  }

  function handleSignup(event) {
    event.preventDefault();
    window.location.href = "/signup";
  }

  

  return (
    <div className="flex-column">
      <BackButton />
      <Alert toggle={toggle} manageToggle={manageToggle} message={message}/>
      <h1>User Login</h1>
      <div className="form-container flex-center">
        <form className="contact-form flex-column">
          <div className="inputgroup">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              required
              className="form-input"
              id="email"
              name="email"
              type="email"
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              value={data.email}

            />
          </div>
          <div className="inputgroup">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              required
              className="form-input"
              id="password"
              name="password"
              type="password"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              value={data.password}
            />
          </div>
          
          
          <div className="inputgroup">
            <button className="form-btn" onClick={submitRequest}>
              Submit
            </button>
            <button className="form-btn" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
