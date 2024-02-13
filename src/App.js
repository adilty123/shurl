import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './Pages/home';
import RegisterForm from './Pages/registerForm';
import LoginForm from './Pages/loginForm';
import UrlForm from './Pages/urlForm';
import {useState, useEffect} from 'react';
import AccountsForm from './Pages/accountsForm';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      console.log("login is false");
      setLoggedIn(false)
      return
    }
    fetch("https://localhost:7087/test", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    })
      .then(r => r.text())
      .then(r => {
        //console.log(r);
        if(r.includes("Hello")){
          console.log("STILL LOGGED IN");
          setLoggedIn(true);
          setEmail(user.email);
          
        }
        else{
          console.log("ELSE IN FETCH");
          setLoggedIn(false);
          setEmail("");
          return
        }
      })
  }, [])
  console.log(email);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home email = {email} loggedIn = {loggedIn} setLoggedIn={setLoggedIn}/>}></Route>
          <Route path = "/loginForm" element = {<LoginForm setEmail = {setEmail} setLoggedIn = {setLoggedIn}/>}></Route>
          <Route path = "/registerForm" element = {<RegisterForm setEmail = {setEmail} setLoggedIn = {setLoggedIn}/>}></Route>
          <Route path = "/urlForm" element={<UrlForm email = {email} loggedIn = {loggedIn} setEmail = {setEmail} setLoggedIn = {setLoggedIn}/>}/>
          <Route path = "/accountsForm" element={<AccountsForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
