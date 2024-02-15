import React from 'react'
import './Landing.css'
import Classroom from '../../Images/Classroom.svg' 
import Search from './Search'

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
      <p>Why you choose us</p>
      <div className="fet">
        <div className="fet1">

        </div>
        <div className="fet2">

        </div>
        <div className="fet3">

        </div>
      </div>
    </div>
    </>
  )
}

export default Landing

