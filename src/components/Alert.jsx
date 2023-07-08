import React from "react";
import "../App.css";

function Alert({ toggle, message }) {
  let style = { display: "none" };
  if (toggle === true)style = { display: "flex" };
  
  return (
    <div style={style} className="alert">
      <h3>{message}</h3>
    </div>
  );
}

export default Alert;
