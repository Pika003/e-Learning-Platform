import React from 'react';

const StudentDocument = () => {
  return (
    <>
      <div className='flex items-center gap-[25rem] px-32 py-2'>
        <div className='flex items-center gap-3'>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/53619c42501fb7619406ed947b38c5fa4f07597c"
          className="w-14" alt="" />
          <h1 className='text-3xl text-[#4E84C1] font-bold'>Title</h1>
        </div>
        <h2 className='text-white'>Document Verification (Student) </h2>
      </div>
      <hr />
      <p className='text-[#4E84C1] p-5 px-10'>Personal Information</p>
      <div className='flex flex-col'>
        <label className='text-white ml-7 font-bold'> First Name </label>
        <input type="text" name="inputField" placeholder='First Name'
        className=" focus:border-blue-800 outline-none placeholder:text-[#e5e5e5]  mt-3 py-3 px-7  border-2 text-[#e5e5e5] bg-transparent rounded-md w-80">
        </input>
      </div>
    </>
  )
}

export default StudentDocument
