import React, { useState } from "react";
import "./Landing.css";
import Classroom from "../../Images/Classroom.svg";
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg"
import Contact from "../Contact/Contact.jsx";
import Footer from "../../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import { NavLink , useNavigate} from "react-router-dom";

function Landing() {
  const [LClass, setLClass] = useState(false);
  const [EMentor, setEMentor] = useState(false);
  const [subject, setSubject] = useState('');

  const navigate = useNavigate()

  const handleSearch = ()=>{
    // console.log('working')
    navigate(`/Search/${subject}`)
  }

  const AA = ()=>{
    setEMentor(true);
    setLClass(false);
  }

  const BB = ()=>{
    setEMentor(false);
    setLClass(true);
  }


  return (
    <>
    <Header/>
    {/* Top Section */}
      <div className="top">
        <div className="left">
          <h1>
          Empowering Minds, Inspiring Futures: <br />Your Gateway to Online Learning with <span className="text-blue-500 font-semibold">Shiksharthee</span>
          </h1>
          {/*  Search  */}

          <div className="search mb-10">
            <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5" width={30} alt="" />
            <input type="text" placeholder='Ex: Zoology ...' value={subject} onChange={(e)=>setSubject(e.target.value)}/>
            <button className='w-32' onClick={handleSearch}>Find Teacher</button>
          </div>

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
          <div className="fet cursor-pointer" onClick={AA}>
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

          <div className="fet cursor-pointer" onClick={BB}>
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

          <NavLink to='/contact'>
            <div className="fet cursor-pointer">
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
          </NavLink>
        </div>
        {LClass && (
          <div className="flex items-center justify-center">hiiiiiiiig Live Class</div>
        )}

        {EMentor && (
          <div className="flex items-center justify-center">E Mentor Liass</div>
        )}
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
            <img src={Plant2} width={300} alt="" />
          </div>
          <p>
            At Shiksharthee, we believe in the power of education to transform lives. Our platform is designed to be a gateway to knowledge, offering a diverse range of courses and learning experiences for students.
            <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Our Story</h1>
            Shiksharthee was born out of a passion for learning and a desire to make quality education accessible to everyone. We understand the challenges faced by modern learners and strive to provide a solution that is both convenient and effective.
            <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Our Mission</h1>
            Our mission is simple yet profound: to empower individuals through education. We aim to create a global learning community where students can discover new passions, enhance their skills, and achieve their academic and professional goals. By leveraging technology and innovative teaching methods, we strive to make learning engaging, interactive, and enjoyable.
          </p>
          <div className="right-svg">
            <img src={Plant} width={400} alt="" />
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
