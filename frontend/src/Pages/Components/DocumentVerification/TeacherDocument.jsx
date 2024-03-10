import React, { useState } from 'react';
import Input from './InputCOmponent/Input';
import InputUpload from './Inputupload/InputUpload';

const TeacherDocument = () => {

  return (
    <>
      <div className='flex items-center gap-[25rem] px-32 py-2'>
        <div className='flex items-center gap-3'>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/53619c42501fb7619406ed947b38c5fa4f07597c"
          className="w-14" alt="" />
          <h1 className='text-3xl text-[#4E84C1] font-bold'>Title</h1>
        </div>
        <h2 className='text-white text-xl'>Document Verification (Teacher) </h2>
      </div>
      <hr />
      <p className='text-[#4E84C1] p-5 px-10'>Personal Information</p>
      <div className='flex flex-wrap gap-20 px-36 mb-10'>
        <Input label={"First Name"} placeholder={"First Name"}/>
        <Input label={"Last Name"} placeholder={"Last Name"}/>
        <Input label={"Phone No."} placeholder={"Phone No."}/>
      </div>

      <div className='flex flex-wrap gap-20 px-36'>
        <Input label={"Home Address"} placeholder={"Home Address"}/>
        <Input label={"Experience (years)"} placeholder={"Experience (years)"}/>
        <InputUpload label={"Upload Aadhar Card"} placeholder={"Upload Aadhar Card"}/>
      </div>
      
      <p className='text-[#4E84C1] p-5 px-10 pt-10'>Educational Information</p>
      <div className='border h-full mx-36 '>
        <div className='flex flex-row gap-7 '>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
            <p className=' text-white text-sm'>Secondary School</p>
          </div>
          <Input placeholder={"10th School Name"}/>
          <Input placeholder={"Total Marks (%)"}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload 10th Result"}/>
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-7'>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
            <p className=' text-white text-sm'>Higher Secondary</p>
          </div>
          <Input placeholder={"12th School Name"}/>
          <Input placeholder={"Total Marks (%)"}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload 12th Result"}/>
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-7'>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
            <p className=' text-white text-sm'>Under Graduation</p>
          </div>
          <Input placeholder={"U.G. College/University Name"}/>
          <Input placeholder={"CGP/SGP out of 10"}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload U.G. Result"}/>
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-7'>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm px-5'>
            <p className=' text-white text-sm'>Post Graduation</p>
          </div>
          <Input placeholder={"P.G. College/University Name"}/>
          <Input placeholder={"CGP/SGP out of 10"}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload P.G. Result"}/>
          </div>
        </div>
      </div>
      <div className=' bg-[#0D286F] p-3 m-6 rounded-md w-[5.7rem] ml-[85%] cursor-pointer'>
        <p className=' text-white text-sm'>Submit ▶️</p>
      </div>
    </>
  )
}

export default TeacherDocument
