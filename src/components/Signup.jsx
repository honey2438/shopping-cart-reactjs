import React from "react";
import { useState } from "react";
import Alert from "./Alert";
import { useEffect } from "react";
import BackButton from "./BackButton";
import { useCallback } from "react";
import axios from "axios";
import { getConfig } from "../config/getConfig";

function Signup() {
  const initialState = {
    name: "",
    email: "",
    password1: "",
    password2:""
  };
  const [data, setData] = useState(initialState);
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");
  const config = getConfig();
  const signup_url = config.signup_url;

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
    axios.post(signup_url,data).then((res) => {
        // get the message from the server
        setToggle(true);
        setMessage("Account Created!");
        
        // navigate to the home page
          window.location.href = "/login";
        }
        ).catch((e) => {
            setToggle(true);
            setMessage("Account already exists!");
            console.log(e);
            });
  }

  

  return (
    <div className="flex-column">
      <BackButton />
      <Alert toggle={toggle} manageToggle={manageToggle} message={message} />
      <h1>User Signup</h1>
      <div className="form-container flex-center">
        <form className="contact-form flex-column">
          <div className="inputgroup">
            <label className="form-label" htmlFor="name">
              Name*
            </label>
            <input
              required
              className="form-input"
              id="name"
              name="name"
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
              value={data.name}
            />
          </div>
          <div className="inputgroup">
            <label className="form-label" htmlFor="email">
              Email*
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
            <label className="form-label" htmlFor="password1">
              Password
            </label>
            <input
              required
              className="form-input"
              id="password1"
              name="password1"
              type="password"
              onChange={(e) => {
                setData({ ...data, password1: e.target.value });
              }}
              value={data.password1}
            />
          </div>
          <div className="inputgroup">
            <label className="form-label" htmlFor="email">
              Confirm Password
            </label>
            <input
              required
              className="form-input"
              id="password2"
              name="password2"
              type="password"
              onChange={(e) => {
                setData({ ...data, password2: e.target.value });
              }}
              value={data.password2}
            />
          </div>
          
          <div className="inputgroup">
            <button className="form-btn" onClick={submitRequest}>
              Submit
            </button>
            <button className="form-btn" onClick={reset}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
