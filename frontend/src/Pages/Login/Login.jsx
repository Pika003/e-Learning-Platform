import React, { useState } from "react";
import HR from "../Login/Images/HR.svg";
import "./Login.css";
import { NavLink, Navigate } from "react-router-dom";
import Radiobtn from "../Components/RadioBtn/Radiobtn";

export default function Login() {
  // State to hold user input and errors
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState('student');



  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const newErrors = {};

    if (!Email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      newErrors.email = "Invalid email format";
    }

    if (!Password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      // Update the errors state and prevent form submission
      setErrors(newErrors);
      return;
    }

    // Prepare data object to send to the backend
    const data = {
      Email: Email,
      Password: Password,
    };

    try {
      // Send data to backend (you need to implement this part)
      const response = await fetch(`/api/${userType}/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const errorData = await response.json();
      console.log(errorData);
      // Handle response
      if (response.ok) {
        // Authentication successful, you can redirect or do something else
        console.log("Login successful");
        Navigate("/");
      } else if (response.status === 401) {
        // Incorrect password
        setErrors({ password: errorData.message || "Incorrect password" });
      } else if (response.status === 403) {
        // Account locked, disabled, or other authentication issues

        setErrors({ general: errorData.message || "Login failed" });
      } else if (response.status === 400) {
        setErrors({ general: errorData.message || "User does not exist" });
      } else if (response.status === 422) {
        setErrors({
          general: errorData.message || '"Email" must be a valid email',
        });
      } else {
        // Other unexpected errors
        setErrors({ general: "An unexpected error occurred" });
      }
    } catch (error) {
      console.log("Error:", error.message);
      setErrors(error.message);
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
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <div className="input-2">
              <input
                type="password"
                placeholder="Password"
                className="input-0"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            {/* radio buttons */}
            <div className="radio-btn">
              <Radiobtn  userType={userType} setUserType={setUserType}  />
            </div>

            <div className="signup-link">
              <span>Don't have an account? </span>
              <NavLink to="/signup" className="link">
                signup
              </NavLink>
            </div>

            {/* btns */}
            <div className="btns">
              <button type="submit" className="btns-1">
                Log In
              </button>
            </div>
            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}
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