import React, { useState } from "react";
import { useCookies } from 'react-cookie';

const Auth = () => {
  const [cookies,setCookie, removeCookie]= useCookies({});
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogIn, setIsLogin] = useState(true);

  console.log(cookies)
  console.log(email, password, confirmPassword)

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match!');
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.detail){
      setError(data.detail)
      } else {
        setCookie('Email',data.email)
        setCookie('AuthToken', data.token)

        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? "Please Log In" : "Please Sign Up!"}</h2>
          <input
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)}/>
          
          <input type="password" 
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value) } 
          />
          {!isLogIn && <input 
          type="password" 
          placeholder="Confirm password"
          onChange={(e)=> setConfirmPassword(e.target.value)} 
          />}
          <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogIn ? 'login': 'signup')}/>
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogIn ? "rgb(255,255,255)" : "rgb(188,188,188)",
              color: !isLogIn ? "rgb(0,0,0)" : "rgb(255,255,255)",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogIn ? "rgb(255,255,255)" : "rgb(188,188,188)",
              color: isLogIn ? "rgb(0,0,0)" : "rgb(255,255,255)",
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

  