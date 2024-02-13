//Displays register form and handle events related.
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './form.css';

const RegisterForm = (props) =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [passwordConfError, setPasswordConfError] = useState("")

    const navigate = useNavigate();

    //Checks inputs match conditions needed. Shows nessesary error message.
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
            let str = "•The password must be 8 characters or longer\n" + 
            "•The password must contain at least 1 capital letter" +
            "•The password must contain at least 1 digit" +
            "•The password must contain at least 1 special character";

            setPasswordError(<ul><li>The password must be 8 characters or longer</li>
                            <li>The password must contain at least 1 capital letter</li>
                            <li>The password must contain at least 1 digit</li>
                            <li>The password must contain at least 1 special character</li></ul>)
            
            return
        }

        if(password !== passwordConf){
            setPasswordConfError("Password and confirmation must match")
            return
        }

        registerAccount();
    }

    //Registers account if user doesnt exist, redirect to login page.
    const registerAccount = () =>{
        const apiUrl = 'https://localhost:7087/register';

        const postData = {
            email: email,
            password: password,
          };

          fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => response)
        .then(response => {
            if(response.status === 200){
                console.log(response);
                console.log("Success");
                navigate('/loginForm');
            }
            else{
                console.log("Email already exists.")
            }

        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
    }

    const passwordCheck = () =>{
        if(password.length < 7 ||  !/[A-Z]/.test(password) || 
            !/\d/.test(password) || !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)){
            return false
        }
        return true

    }
    
    return <div className = {"mainContainer"}>
        <div className={"title"}>
            <div>Register</div>
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
        <div className="input">
            <input
                type = "password"
                value = {passwordConf}
                placeholder="Confirm password"
                onChange={ev => setPasswordConf(ev.target.value)}
                className={"inputBox"}
            />
            <label className="errorLabel">{passwordConfError}</label>
        </div>
        <br/>
        <div className={"inputContainer"}>
            <input 
                className={"inputButton"}
                type = "button"
                onClick={onButtonClick}
                value = {"Register"}
            />
        </div>
    </div>
}

export default RegisterForm;