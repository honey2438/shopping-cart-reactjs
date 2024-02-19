import React, { useEffect } from "react";
import { useState } from "react";
import Alert from "./Alert";
import BackButton from "./BackButton";
import { useCallback } from "react";
import axios from "axios";
import { get_token } from "../services/get_token";
import { remove_token } from "../services/remove_token";
import { getConfig } from "../config/getConfig";

function Profile() {

  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    new_password: "",
  });

  const [updateFields, setUpdateFields] = useState({
    email: true,
    password: true,
    name: true

  }
  );

  const [copyData, setCopyData] = useState({
    email: "",
    password: "",
    new_password: "",
    name: "",
  });

  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");
  const config = getConfig();
  const update_user_url = config.update_user_url;
  const get_user_url = config.get_user_url;
  const logout_url = config.logout_url;

  const manageToggle = useCallback(() => {
    setToggle(false);
  }, [toggle]);

  useEffect(() => {
    axios
      .get(get_user_url, {
        headers: { Authorization: get_token() },
      })
      .then((res) => {
        console.log(res.data.data);

        const data={
          email:res.data.data.email,
          name:res.data.data.name,
          password:"",
          new_password:""
        }

        setData(data);
        setCopyData(data);
      })
      .catch((e) => {
        console.log(e.message);
        setMessage("Please Login!");
        setToggle(true);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (data.password.length<6 && updateFields.password===false) {
      setMessage("Password shall be at least 6 characters long");
      setToggle(true);
      return;
    }
    if (data.new_password.length<6 && updateFields.password===false) {
      setMessage("Password shall be at least 6 characters long");
      setToggle(true);
      return;
    }
    if ((data.name.length<4 || data.name===copyData.name) && updateFields.name===false) {
      setMessage("Please enter a new name");
      setToggle(true);
      return;
    }
    if ((data.email.length<6 || data.email===copyData.email) && updateFields.email===false) {
      setMessage("Please enter a new email");
      setToggle(true);
      return;
    }
   if(updateFields.name===false || updateFields.email===false || updateFields.password===false){
    let updateField=[]
    for(const key in updateFields) {
      if (updateFields[key]===false) {
        updateField.push(key);
      }
    }
    console.log(data)
    
    axios
      .post(update_user_url,{"update_field":updateField,"name":data.name,"email":data.email,"password":data.password,"new_password":data.new_password}, {
        headers: { Authorization: get_token() }
      }).then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
        setToggle(true);
        window.location.reload();
      }).catch((e) => {
        console.log(e.message);
        setMessage("Error updating user");
        setToggle(true);
      });

    
  };
}

const logoutUser = (e) => {
  e.preventDefault();
  
  axios.get(logout_url, {
    headers: { Authorization: get_token() },
  }).then((res) => {
  remove_token();
  window.location.href = "/login";
  setMessage("Logged out successfully");
  setToggle(true);
  }
  ).catch((e) => {
    console.log(e.message);
    setMessage("Error logging out");
    setToggle(true);
  });
};


  

  const handleFieldUpdate = (field) => {
    if (field === "name") {
      setUpdateFields({...updateFields,name:updateFields.name=updateFields.name?false:true});
      if (updateFields.name) {
        setData({ ...data, name: copyData.name });
      }
    }
    else if (field === "email") {
      setUpdateFields({...updateFields,email:updateFields.email=updateFields.email?false:true});
      if (updateFields.email) {
        setData({ ...data, email: copyData.email });
      }
    }

    else if (field === "password") {
      setUpdateFields({...updateFields,password:updateFields.password=updateFields.password?false:true});
      if (updateFields.password) {
        setData({ ...data, password: copyData.password });
      }
    }
  };


  const handleDiscard = (event) => {
    // reload the page
    event.preventDefault();
    window.location.reload();
  }

  return (
    <div className="flex-column">
      <BackButton />
      <Alert toggle={toggle} manageToggle={manageToggle} message={message} />
      <h1>User Profile</h1>
      <div className="form-container flex-center">
        <form className="contact-form flex-column">
          <div className="inputgroup">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              required
              className="form-input"
              id="name"
              name="name"
              type="text"
              disabled={updateFields.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
              value={data.name}
            />
            <span style={{cursor:"pointer"}} onClick={()=>handleFieldUpdate("name")}>
            {updateFields.name?"Edit":"Cancel"}
            </span>
          </div>
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
              disabled={updateFields.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              value={data.email}
            />
            <span style={{cursor:"pointer"}} onClick={()=>handleFieldUpdate("email")}>
              {updateFields.email?"Edit":"Cancel"}
            </span>
          </div>
          <span style={{cursor:"pointer"}} onClick={()=>handleFieldUpdate("password")}>
            {updateFields.password?"Change Password":"Cancel"}
          </span>
          {!updateFields.password && (
            <>
              <div className="inputgroup">
                <label className="form-label" htmlFor="password">
                  Existing Password
                </label>
                <input
                  required
                  className="form-input"
                  id="password"
                  name="password"
                  type="password"
                  disabled={updateFields.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                  value={data.password}
                />
                
              </div>
              <div className="inputgroup">
                <label className="form-label" htmlFor="password">
                  New Password
                </label>
                <input
                  required
                  className="form-input"
                  id="new_password"
                  name="new_password"
                  type="password"
                  disabled={updateFields.password}
                  onChange={(e) => {
                    setData({ ...data, new_password: e.target.value });
                  }}
                  value={data.new_password}
                />
              </div>
            </>
          )}

          <div className="inputgroup">
            <button className="form-btn"  onClick={handleUpdate}>Update</button>
            <button className="form-btn" onClick={handleDiscard} >
              Discard
            </button>
          </div>
          <button className="form-btn"  onClick={logoutUser}>Logout</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
