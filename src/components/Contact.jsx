import React from "react";
import { useState } from "react";
import Alert from "./Alert";
import { useEffect } from "react";
import BackButton from "./BackButton";

function Contact() {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    query: "",
    city: "",
  };
  const [data, setData] = useState(initialState);

  function reset(event) {
    event.preventDefault();
    setData(initialState);
  }

  function manageToggle() {
    setToggle(true);
    setTimeout(() => {
      setToggle(false);
    }, 2000);
  }

  function submitRequest(event) {
    manageToggle();
    event.preventDefault();
    if (localStorage.getItem("contact") === null) {
      localStorage.setItem("contact", JSON.stringify([data]));
    } else {
      let contact = JSON.parse(localStorage.getItem("contact"));
      contact.push(data);
      localStorage.setItem("contact", JSON.stringify(contact));
    }
  }

  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex-column">
      <BackButton />
      <Alert toggle={toggle} message="Request submitted successfully!" />
      <h1>Contact Form</h1>
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
            <label className="form-label" htmlFor="phone">
              Phone No*
            </label>
            <input
              required
              className="form-input"
              id="phone"
              name="phone"
              type="phone"
              onChange={(e) => {
                setData({ ...data, phone: e.target.value });
              }}
              value={data.phone}
            />
          </div>
          <div className="inputgroup">
            <label className="form-label" htmlFor="query">
              Query*
            </label>
            <textarea
              required
              className="form-input"
              id="query"
              name="query"
              onChange={(e) => {
                setData({ ...data, query: e.target.value });
              }}
              value={data.query}
            />
          </div>
          <div className="inputgroup">
            <label className="form-label" htmlFor="city">
              City*
            </label>
            <select
              id="city"
              name="city"
              className="form-input"
              onChange={(e) => {
                setData({ ...data, city: e.target.value });
              }}
              value={data.city}
            >
              <option value="Noida">Noida</option>
              <option value="Delhi">Delhi</option>
              <option value="Faridabad">Faridabad</option>
            </select>
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

export default Contact;
