import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { get_token } from "../services/get_token";
import { getConfig } from "../config/getConfig";


function Home() {
  const [name, setName] = useState("User");
  const config = getConfig();
  const get_user_url = config.get_user_url;

  useEffect(() => {
    axios.get(get_user_url,{headers:
    {'Authorization':get_token()}}).then((res) => {
      // console.log(res.data);
      
      setName(res.data.data.name.split(" ")[0].toUpperCase());
      
    }).catch((e) => {
      console.log(e.message);
    });
  }, []);

  return (
    <div className="home">
      <h1 className="home-label-large">Welcome {name} !</h1>
      {name!=="User"? (<p className="home-label-small">Start Shopping Now</p>):
      (<p className="home-label-small">You are not logged in</p>)}

    </div>
  );
}

export default Home;
