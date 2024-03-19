import React from 'react'
import "../Landing/Landing.css";
import Mail from "../../Images/Meet-the-team.svg";
import Header from '../Header/Header';

function Contact() {
  return (
    <>
    <Header/>
    <div className="contact">
        <h4>Contact Us</h4>
        <hr className="underLine"/>
        <div className="content">
          <img src={Mail} width={700} alt="" />
          <form  className="form-submit">
            <h4>Send Message</h4>
            <input
              type="text"
              placeholder="Name"
              className="input"
            />
            <input
              type="text"
              placeholder="Email Address"
            />
            <textarea
              placeholder="Message"
              className="textArea"
              name="message"
            />
            <button className="w-[19rem] bg-light-blue-800">Send A Message</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact