import { useState } from "react";
import { useLocation } from "react-router-dom";
import ActionBar from "../Components/actionBar";

const AccountsForm = (props) =>{
    const {state} = useLocation();
    const [email, setEmail] = useState(state.email);
    const [loggedIn, setLoggedIn] = useState(state.loggedIn);

    console.log("Accounts FORM state: " + state.email);

    return(
        <div className="content">
            <ActionBar email = {email} loggedIn = {loggedIn}/>
            <div className="form-container">



            </div>
        </div>
    );
}

export default AccountsForm;