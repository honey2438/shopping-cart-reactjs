import React from 'react';
import { useState } from 'react';

function Contact() {
    const initialState={
        name: "",
        email: "",
        phone: "",
        city: "",
        speciality: "",
      }
      const [data, setData] = useState(initialState);
    
    
      function reset(event){
        event.preventDefault();
        setData(initialState);
      }
    
      return (
        <div className="flex-column">
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
                <button className="form-btn">
                  Submit
                </button>
                <button className="form-btn" onClick={reset}>Clear</button>
              </div>
            </form>
          </div>
        </div>
      );
}

export default Contact