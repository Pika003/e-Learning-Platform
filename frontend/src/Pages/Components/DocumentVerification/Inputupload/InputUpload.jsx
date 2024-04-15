import React, { useState } from 'react';

const InputUpload = ({ label, placeholder,value,onChange}) => {
 


  return (
      <div>
      <label className='text-white ml-7 font-bold'>{label}</label>
      <div className="mt-3 relative">
      
        <input
          type="file"
          accept="image/jpeg, image/png, application/pdf" 
          className="absolute inset-0 z-50 opacity-0 cursor-pointer"
          onChange={onChange}
        />
       
        <div className="relative z-0 flex items-center justify-center w-80 py-3 px-7 border-2 text-[#e5e5e5] rounded-md cursor-pointer">
          <span className='mr-28'>
            {value ? value.name : placeholder}
          </span>
          <span className=' bg-[#0D286F] text-white p-[0.4rem] rounded-sm absolute right-2'>Choose File</span>
        </div>
      </div>
    </div>
  );

}

export default InputUpload;


