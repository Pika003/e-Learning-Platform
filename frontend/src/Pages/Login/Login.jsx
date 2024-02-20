import React from "react";
import HR from "../Login/Images/HR.svg";
import "./Login.css";
import { NavLink } from 'react-router-dom'
import Radiobtn from "../Components/RadioBtn/Radiobtn";

export default function Login() {
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
          <form action="">
            <div className="input-1">
              <input type="text" placeholder="Email Address" className="input-0"/>
            </div>
            <div className="input-2">
              <input type="password" placeholder="password" className="input-0"/>
            </div>
          </form>
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
          <button className="btns-1">Log In</button>
        </div>
      </div>

      {/* image */}
      <div className="img-3">
        <img src={HR} alt="" />
      </div>
    </section>
  );
}
