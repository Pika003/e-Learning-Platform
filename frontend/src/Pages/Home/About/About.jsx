import React from 'react'
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg";
import '../Landing/Landing.css'
import Footer from "../../Footer/Footer.jsx"

function About({backgroundC}) {
  return (
    <>
    <div className="about" style={{backgroundColor: backgroundC}}>
        <h4>About Us</h4>
        <hr className="underLine"/>
        <div className="content">
          <div className="left-svg">
            <img src={Plant2} width={100} alt="" />
          </div>
          <p>
            Welcome to our platform! We are a team of final year students
            pursuing our Master's in Computer Applications (MCA) with a shared
            passion for education and technology. Driven by our commitment to
            facilitate learning and academic growth, we have created this
            website as a bridge between proficient teachers and eager students.
          </p>
          <div className="right-svg">
            <img src={Plant} width={170} alt="" />
          </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default About