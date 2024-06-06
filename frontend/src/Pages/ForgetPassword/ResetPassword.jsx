import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [data, setData] = useState({
    password: '',
    confirmPassword: ''
  });

  const navigate=useNavigate()

  const { token }=useParams()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { password, confirmPassword } = data;

    // Validation checks
    if (!password || !confirmPassword) {
      toast.error("Both fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }
    
    const response= axios.post(`/api/student/forgetpassword/${token}`,{password:data.password,confirmPassword:data.confirmPassword})
     toast.promise(response,{
        loading:"wait for processing",
        success:(response)=> response?.data?.message,
        error:"Time limit Reached Try again"
        
     }) 

     if((await response).data.success){
       navigate('/login')
     }
   
  
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
        
      <form 
        noValidate 
        className="w-96 text-xl bg-cyan-900 p-10  shadow-[0_0_10px_white] flex flex-col gap-5 text-white font-semibold"
        onSubmit={handleSubmit}
      >
        <h1 className=' font-semibold text-2xl text-white'>This link is valid for 15 mins otherwise password will not updated</h1>
        <label 
          htmlFor="password" 
          className="text-2xl text-white font-semibold rounded-md"
        >
          New Password
        </label>
        <input  
          type="password"
          name="password" 
          id="password" 
          placeholder="Enter your password..."
          value={data.password}
          onChange={handleChange}
          className="bg-transparent border-2 border-white py-3 px-4 focus:outline-none focus:border-yellow-500 rounded-lg"
        />

        <label 
          htmlFor="confirmPassword" 
          className="text-2xl text-white font-semibold rounded-md"
        >
          Confirm Password
        </label>
        <input  
          type="password"
          name="confirmPassword" 
          id="confirmPassword" 
          placeholder="Confirm your password..."
          value={data.confirmPassword}
          onChange={handleChange}
          className="bg-transparent border-2 border-white py-3 px-4 focus:outline-none focus:border-yellow-500 rounded-lg"
        />
        <button 
          type="submit" 
          className="mt-5 bg-yellow-500 text-cyan-900 py-1 px-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
