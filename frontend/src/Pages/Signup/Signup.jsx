import React, { useState } from "react";
import "./Styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import Images from "../Images/Grammar-correction.svg";
import Radiobtn from "../Components/RadioBtn/Radiobtn";
import Header from "../Home/Header/Header";

const Signup = () => {
  // State to hold user input and errors
  const [Firstname, setFirstName] = useState("");
  const [Lastname, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState('');
  const [err, setErr] = useState('');

  const navigate = useNavigate()


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const newErrors = {};

    if (!Firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }

    if (!Lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }

    if (!Email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      newErrors.email = 'Invalid email format';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(Password)) {
      newErrors.password = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.';
    }

    if (Object.keys(newErrors).length > 0) {
      // Update the errors state and prevent form submission
      setErrors(newErrors);
      return;
    }

    // Prepare data object to send to the backend
    const data = {
      Firstname: Firstname,
      Lastname: Lastname,
      Email: Email,
      Password: Password,
    };

    try {
      // Send data to backend (you need to implement this part)
      const response = await fetch(`/api/${userType}/signup`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Handle response
      const responseData = await response.json();

      setErr(responseData.message);

      if (response.ok) {
        // Registration successful, you can redirect or do something else
        console.log("Registration successful");
        navigate('/varifyEmail');
      } else if (response.status === 400) {
        // Handle specific validation errors returned by the server
        setErrors(responseData.errors || {});
      } else {
        // Other status codes (e.g., 500 Internal Server Error)
        console.error("Registration failed with status code:", response.status);
      }
    } catch (error) {
      setErrors(error.message);
     
    }
  };

  return (
    <>
    <Header/>
    <div className="section">
      <article className="article">
        {/* <div className="logo-1">
          <img src="" alt="" />
          <h4 className="logo-head">logo</h4>
        </div> */}
        <div className="header">
          <h3 className="head">WELCOME</h3>
          <h4 className="Sub-head">join us today !!</h4>
        </div>

        <div className="inpts">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-x input-4"
              placeholder="Firstname"
              value={Firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstname && (
              <div className="error-message">{errors.firstname}</div>
            )}

            <input
              type="text"
              className="input-x input-5"
              placeholder="Lastname"
              value={Lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastname && (
              <div className="error-message">{errors.lastname}</div>
            )}

            <input
              type="text"
              className="input-x input-6"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}

            <input
              type="password"
              className="input-x input-7"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}

            <div className="rad-btns">
              <Radiobtn userType={userType} setUserType={setUserType}/>
            </div>

            <div className="signupage">
              <span>Already have an account? </span>
              <NavLink to="/Login" style={{ color: "green" }} className="link">
                login
              </NavLink>
            </div>
            <div className="btn">  
            <button type="submit" className="btn-4">
              Signup
            </button>
            </div>
          </form>
          {err && (
              <div className="error-message">{err}</div>
          )}
        </div>
      </article>

      <div className="right-part">
        <img src={Images} alt="" className="imgs" />
      </div>
    </div>
    <p className='text-sm text-red-400 absolute bottom-3 left-3'>* Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.</p>
    </>
  );
};

export default Signup;
