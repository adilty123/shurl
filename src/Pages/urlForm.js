//Displays video upload form and handles events related to form.
import React, {useEffect, useState} from "react";
import "./urlForm.css";
import ActionBar from "../Components/actionBar";
import {useNavigate} from "react-router-dom";

const UrlForm = () =>{
    const [email,setEmail] = useState("")
    const [loggedIn, setLoggedIn] = useState(false);
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [urlError, setUrlError] = useState("");

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

    console.log("UPLOAD FORM PROPS:" + email);

    //const navigate = useNavigate();
    
    const isValidUrl = (urlString) =>{
        try{
            return Boolean(new URL(urlString));
        }
        catch(e){
            return false;
        }
    }
    //Post API call to add clip to Clips SQL table.
    const onButtonClick = () =>{

        if(isValidUrl(longUrl) == false){
            setUrlError("Invalid Url");
            return;
        }

        const apiUrl = "https://localhost:7087/api/Urls";

        const postData = {
            id: 0,
            dateCreated: "2024-02-07T01:15:29.174Z",
            userEmail: email,
            originalUrl: longUrl,
            shortUrl: shortUrl,
            code: ""
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
          console.log(response);
          console.log(response.shortUrl);
          setShortUrl(response.shortUrl);
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error);
        });
    }

    //Checks if user is already logged in or not using local machine storage.
    console.log(shortUrl);
    return(
        <div id = "content">
            <ActionBar email = {email} loggedIn = {loggedIn}/>
            <form className="url-form">
                <div className="inputs-container">
                    <h1 className="instructions">Paste Url Below</h1>
                    <input
                        type="text"
                        className="url-input"
                        placeholder="Enter Url"
                        value={longUrl}
                        onChange={ev => setLongUrl(ev.target.value)}
                    />
                    <label className="errorLabel">{urlError}</label>
                    <input
                        type="button"
                        id="submit-button"
                        onClick={onButtonClick}
                        value="Shorten Url"
                    />
                    <div className="output">
                    <input
                        readOnly
                        type="text"
                        className="url-output"
                        placeholder="Short Url"
                        value={shortUrl}
                    />
                    <input
                        type = "button"
                        id = "copy-button"
                        onClick={() => {navigator.clipboard.writeText(shortUrl)}}
                        value = "Copy Link"
                    />
                    </div>
                </div> 
            </form>
            </div>
        
    );
}

export default UrlForm;