//Action bar component.
//Contains website title, logout button, view profile etc.
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import './actionBar.css'

const ActionBar = () =>{
    const [email, setEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (!user || !user.token) {
        console.log("login is false");
        setLoggedIn(false)
        return
      }
      else{
          setEmail(user.email);
          setLoggedIn(true);
      }

    });
    
    console.log("ACTION BAR STATE: " + email);


    const navigate = useNavigate();

    const onButtonLogout = () =>{
        navigate("/loginForm", { state: { loggedIn: false } });
    }

    return(
      <div class="actionBar">
      <div class="left-section">
          <h1 class="heading">Url Shortener</h1>
      </div>
      <div class="right-section">
          <h2 class="heading">{email}</h2>
          <input 
              class="inputButton"
              id="logoutButton"
              type="button"
              onClick={onButtonLogout}
              value="Logout"
          />
      </div>
      </div>
    );
}

export default ActionBar;