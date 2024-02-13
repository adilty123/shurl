//Login form compoenet. Displays login form and handles events realted to form.
import React, {useState, useEffect} from "react";
import './form.css';
import {useNavigate} from "react-router-dom"

const LoginForm = (props) =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate();

    const onButtonRegister = () =>{
        navigate("/registerForm")
    }
    //Checks if email and password meet nessesary conditions.
    const onButtonClick = () => {
        if(email === ""){
            setEmailError("Please enter your email")
            return
        }

        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            setEmailError("Please enter a valid email")
            return
        }

        if(password === ""){
            setPasswordError("Please enter your password")
            return
        }

        if(passwordCheck() === false){
            setPasswordError("Invalid password")
            return
        }

        checkAccount()
        
    }
    //Checks if password meets API's password conditions.
    const passwordCheck = () =>{
        if(!/[A-Z]/.test(password) || 
            !/\d/.test(password) || !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)){
            return false
        }
        return true

    }
    
    //Checks if login credentials are valid. Loads upload form if correct and saves user on local machine.
    const checkAccount = () =>{
        const apiUrl = 'https://localhost:7087/login';

        const postData = {
            email: email,
            password: password,
            twoFactorCode: 'string',
            twoFactorRecoveryCode: 'string',
          };

        
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => response.json())
        .then(response => {
          // Handle the response data
          if(response.hasOwnProperty('accessToken')){
            setPasswordError("Success");
            localStorage.setItem("user", JSON.stringify({email, token: response.accessToken}));
            props.setLoggedIn(true);
            props.setEmail(email);
            navigate('/urlForm');
          }
          else{
            setPasswordError("Invalid email or password");
          }

          console.log(response.status);
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error);
        });
    }
    
    return <div className = {"mainContainer"}>
        <div className={"title"}>
            <div>Login</div>
        </div>
        <br/>
        <div className={"input"}>
            <input 
                value = {email}
                placeholder="Enter your email"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"}
            />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br/>
        <div className="input">
            <input
                type = "password"
                value = {password}
                placeholder="Enter your password"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"}
            />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br/>
        <div className={"inputContainer"}>
            <input 
                className={"inputButton"}
                type = "button"
                onClick={onButtonClick}
                value = {"Login"}
            />
        </div>
        <div className={"inputContainer"}>
            <input 
                className={"inputButton"}
                type = "button"
                onClick={onButtonRegister}
                value = {"Register"}
            />
        </div>
    </div>
}

export default LoginForm;