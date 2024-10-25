import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
function LoginPopup({ setShowLogin }) {
  const {url,setToken,token} = useContext(StoreContext)
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data,setData] = useState({
    name:"",
    email:"",
    password:"",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
      if(currentState === "Login"){
        newUrl += "/api/user/login";
      }else{
        newUrl += "/api/user/register";
      }

      const response = await axios.post(newUrl,data,{
        headers: {'Content-Type': 'application/json'},
      });

      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("foodToken", response.data.token);
        setShowLogin(false);
      }else{
        alert(response.data.message);
      }
  }


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              required
            />
          )}
          <input
            type="text"
            placeholder="Your email"
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={onChangeHandler}
            value={data.password}
            name="password"
          />
        </div>
        <button type='submit'>
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" && (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        )}
        {currentState === "Sign Up" && (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup
