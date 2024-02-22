import React, { useState } from "react";
import HR from "../Login/Images/HR.svg";
import "./Login.css";
import { NavLink } from 'react-router-dom';
import Radiobtn from "../Components/RadioBtn/Radiobtn";

export default function Login() {
  // State to hold user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data object to send to the backend
    const data = {
      email: email,
      password: password
    };

    try {
      // Send data to backend (you need to implement this part)
      const response = await fetch('http://localhost:4400/api/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Handle response
      if (response.ok) {
        // Authentication successful, you can redirect or do something else
        console.log('Login successful');
      } else {
        // Authentication failed, handle accordingly
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="main">
      <div className="container">
        <div className="logo">
          <img src="" alt="" />
          <h1 className="head">Logo</h1>
        </div>
        {/* headings */}
        <div className="para1">
          <h2> WELCOME BACK!</h2>
        </div>

        <div className="para">
          <h5> Please Log Into Your Account.</h5>
        </div>

        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-1">
              <input 
                type="text" 
                placeholder="Email Address" 
                className="input-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-2">
              <input 
                type="password" 
                placeholder="Password" 
                className="input-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* radio buttons */}
            <div className="radio-btn">
              <Radiobtn/>
            </div>

            <div className="signup-link">
              <span>Don't have an account?  </span>
              <NavLink to='/signup' className="link">
                signup
              </NavLink>
            </div>
          
            {/* btns */}
            <div className="btns">
              <button type="submit" className="btns-1">Log In</button>
            </div>
            
          </form>
        </div>
      </div>

      {/* image */}
      <div className="img-3">
        <img src={HR} width={600} alt="" />
      </div>
    </section>
  );
}
