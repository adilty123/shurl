import React, { useState } from "react"
import {useNavigate} from "react-router-dom";
import './form.css';
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";



const Home = (props) => {
    const {loggedIn, email} = props
    const navigate = useNavigate();

    const onButtonLogin = () =>{
        navigate("/loginForm")
    }

    const onButtonRegister = () => {
        navigate("/registerForm")

    }

    return(
        <div className = "mainContainer">
            <div className = {"title"}>
                <div>Welcome to Url Shortener</div>
            </div>
            <div className = {"loginButton"}>
                <input
                    className = {"inputButton"}
                    type = "button"
                    onClick = {onButtonLogin}
                    value = {loggedIn ? "Log out" : "Log in"}
                />
                <input
                    className = {"inputButton"}
                    type = "button"
                    onClick = {onButtonRegister}
                    value = {"Register"}
                />
            </div>
        </div>
    );

}

export default Home;