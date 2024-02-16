import React from "react";
import HR from "../Login/Images/HR.svg";
import "./Login.css";
import { NavLink } from 'react-router-dom'
import Radiobtn from "../Components/RadioBtn/Radiobtn";

export default function LeftSec() {
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
              <input type="text" placeholder="Email Address" />
            </div>
            <div className="input-2">
              <input type="text" placeholder="password" />
            </div>
          </form>
        </div>

        {/* forgot-passw click */}
        {/* <div className="Remember">
          <span className="head-2 ">Rememberme</span>
          <span className="head-3 active">Forgot password?</span>
        </div> */}

        {/* radio buttons */}

        <div className="radio-btn">
          <Radiobtn/>
        </div>

        {/* <NavLink to='/signup' className="signup-link">
          <p>Don't have an account?<span> sign up</span></p>
        </NavLink> */}

        <div className="signup-link">
          <span>Don't have an account?  </span>
          <NavLink to='/signup' className="link">
            signup
          </NavLink>
        </div>

        {/* btns */}

        <div className="btns">
          <button className="btns-1">Log in</button>
          <button className="btns-2">Sing up</button>
        </div>
      </div>

      {/* image */}
      <div className="img-3">
        <img src={HR} alt="" />
      </div>
    </section>
  );
}
