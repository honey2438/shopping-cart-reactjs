import React from "react";
import "../App.css";

function Alert({ toggle,manageToggle, message }) {
  // console.log("alert called");
  let style = { display: "none" };
  if (toggle === true){
    style = { display: "flex" };
    setTimeout(() => {
      manageToggle(false);
    }, 2000);
  }

  
  return (
    <div style={style} className="alert">
      <h3>{message}</h3>
    </div>
  );
}

export default Alert;
