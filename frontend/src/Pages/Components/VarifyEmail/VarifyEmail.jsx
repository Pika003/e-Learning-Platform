import React from 'react'
import Email from '../../Images/email.svg'
import { NavLink } from "react-router-dom"
import Header from '../../Home/Header/Header'

function VarifyEmail() {
  return (
    <>
    <Header/>
    <div className='flex justify-center'>
        <div className='bg-blue-gray-900 w-96 h-96  rounded-md flex flex-col gap-5 justify-center items-center mt-10'>
            <img src={Email} width={150} alt="email" />
            <p className='text-white text-3xl'>Send Email</p>
            <p className='text-gray-300 mx-7 text-sm'>We have sent a verification link to your Email. Click on the link to complete the verification process. You might need to check your spam folder.</p>
            <NavLink to='/login'>
                <p className=' text-blue-700'>◀ Back to Login</p>
            </NavLink>
        </div>
    </div>
    </>
  )
}

export default VarifyEmail