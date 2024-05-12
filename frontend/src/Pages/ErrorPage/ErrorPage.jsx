import React from 'react'
import { NavLink } from "react-router-dom";
import Error from './Images/error.svg'

function ErrorPage() {
  return (
    <>
    <div className='flex items-center justify-center h-[100vh] gap-5 flex-col'>
        <img src={Error} alt="" width={400} />
        <NavLink to="/" className=' bg-deep-purple-400 text-white py-2 px-5 cursor-pointer'>Back To Home</NavLink>
    </div>
    </>
  )
}

export default ErrorPage