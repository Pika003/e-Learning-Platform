import React from 'react'
import './Styles.css'
import { NavLink } from 'react-router-dom'

import Images from '../Images/Grammar-correction.svg'

import Radiobtn from '../Components/RadioBtn/Radiobtn'

const Signup = () => {
  return (
    <div className='section'>
      <article className='article'>
         <div className='logo-1'>
            <img src="" alt="" />
            <h4 className='logo-head'>logo</h4>
         </div>
         <div className='header'>
           <h3 className='head'>WELCOME</h3>
           <h4 className='Sub-head'>join us today !!</h4>
         </div>

         <div className='inpts'>
          <form  action=''>

          <input type="text"  className='input-x input-4' placeholder='Firstname'/>

          <input type="text"  className='input-x input-5' placeholder='Lastname'/>

          <input type="text"  className='input-x input-6' placeholder='Email'/>

          <input type="text"  className='input-x input-7' placeholder='Password'/>

          </form>
         </div>
         
       <div className='rad-btns'>
         <Radiobtn/>
       </div>
       
       <div className="signupage">
          <span>Already have an account? </span>
          <NavLink to='/Login' style={{color:'green'}} className="link">
            login
          </NavLink>
        </div>
        <div className='btn-4'>Signup</div>
       </article>
       
       {/* {rightsection} */}

       <div className="right-part">
          <img src={Images} alt=""  className='imgs'/>
       </div>

    </div>
  )
}

export default Signup
