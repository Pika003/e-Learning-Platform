import React from "react";
import "./Landing.css";
import Classroom from "../../Images/Classroom.svg";
import Search from "../../Components/Searchbtn/Search";
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg"
import Contact from "../Contact/Contact.jsx";
import Footer from "../../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";

function Landing() {
  return (
    <>
    <Header/>
    {/* Top Section */}
      <div className="top">
        <div className="left">
          <h1>
          Empowering Minds, Inspiring Futures: <br />Your Gateway to Online Learning with <span className="text-blue-500 font-semibold">Shiksharthee</span>
          </h1>
          <Search />
        </div>
        <div className="right">
          <img src={Classroom} width={500} alt="" />
        </div>
      </div>

      {/* Features */}
      <div className="features">
        <p>Why You Choose Us</p>
        {/* <hr className="underLine"/> */}
        <div className="fets2">
          <div className="fet">
            <img
              src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/622a85ea75414daadf6055613c074c5280b95444"
              alt=""
            />
            <h4>Expert Mentor</h4>
            <p>
              Our expert mentors are the cornerstone of our educational
              approach. With a wealth of knowledge they support our students on
              their journey to success.
            </p>
          </div>

          <div className="fet">
            <img
              src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/1478ee1b2a35123ded761b65c3ed2ceaece0d20f"
              alt=""
            />
            <h4>High Quality Live Class</h4>
            <p>
              We deliver high-quality live classes to our students, providing
              interactive learning experiences led by experienced instructors.{" "}
            </p>
          </div>

          <div className="fet">
            <img
              src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/c412120e39b2095486c76978d4cd0bea88fd883b"
              alt=""
            />
            <h4>24/7 Live Support</h4>
            <p>
              We offer our students 24/7 live support. Whether it's a question
              or a challenge at midnight, our dedicated team is here to provide
              guidance, assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="courses">
      <p>Find Your Subject</p>
      <hr className="underLine"/>
      <div className="subjects">
        <div className="subject">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2" alt="Physics" />
          <p>Physics</p>
        </div>
        <div className="subject">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95" alt="Chemistry" />
          <p>Chemistry</p>
        </div>
        <div className="subject">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555" alt="Zoology" />
          <p>Biology</p>
        </div>
        <div className="subject">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664" alt="Math" />
          <p>Math</p>
        </div>
        <div className="subject">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272" alt="Computer" />
          <p>Computer</p>
        </div>
        
      </div>
    </div>

      {/* About Us */}
      <div className="about" style={{backgroundColor: "#042439"}}>
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

      {/* Contact Us */}
      <div className="contact-us">
        <Contact/>
      </div>

      {/* Footer */}
      <Footer/>
    </>
  );
}

export default Landing;
