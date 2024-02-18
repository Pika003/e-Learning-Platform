import React from 'react'
import './Landing.css'
import Classroom from '../../Images/Classroom.svg' 
import Search from './Search'
import Courses from '../Courses/Courses'

function Landing() {
  return (
    <>
    <div className='top'>
      <div className="left">
        <h1>Online Teaching <br/> Marketplace And <br/> E-Learning Platform 
        </h1>
        <Search/>
      </div>
      <div className="right">
        <img src={Classroom} width={500} alt="" />
      </div>
    </div>
    
    <div className="features">
      <p>Why You Choose Us</p>
      <div className="fets">
        <div className="fet">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/622a85ea75414daadf6055613c074c5280b95444" alt="" />
          <h4>Expert Mentor</h4>
          <p>Our expert mentors are the cornerstone of our educational approach. With a wealth of knowledge they support our students on their journey to success.</p>
        </div>

        <div className="fet">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/1478ee1b2a35123ded761b65c3ed2ceaece0d20f" alt="" />
          <h4>High Quality Live Class</h4>
          <p>We deliver high-quality live classes to our students, providing interactive learning experiences led by experienced instructors. </p>
        </div>

        <div className="fet">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/c412120e39b2095486c76978d4cd0bea88fd883b" alt="" />
          <h4>24/7 Live Support</h4>
          <p>We offer our students 24/7 live support. Whether it's a question or a challenge at midnight, our dedicated team is here to provide guidance, assistance.</p>
        </div>
      </div>
    </div>
    <Courses />
    <div className="about">
      <p>About Us</p>
    </div>
    </>
  )
}

export default Landing

