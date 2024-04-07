import React from 'react'
import teachingImg from '../../Images/Teaching.svg'

function TeacherDashboard() {
  return (
    <>
    {/* navbar */}
      <nav className='bg-[#04253A] px-10 py-3 flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/53619c42501fb7619406ed947b38c5fa4f07597c"
            className="w-14" alt="" />
          <h1 className='text-3xl text-[#4E84C1] font-bold'>Title</h1>
        </div>
        <div className='bg-[#0D199D] text-white py-2 px-5 rounded-full'>
          <p>logout</p>
        </div>
      </nav>

      <div className='bg-[#008280] flex justify-between items-center'>
        <div className=' text-white font-semibold text-5xl ml-72'>
          <h1 className='mb-5'>Welcome to</h1>
          <h1 className='ml-10'>E Learning Platform</h1>
        </div>
        <div className='m-5 mr-20'>
          <img src={teachingImg} alt="teaching" width={300}/>
        </div>
      </div>

      {/* sidebar */}
      <div className='bg-[#071645] w-52 h-[88.5vh] absolute top-20'>
        <div className='flex flex-col gap-5 text-xl items-center text-white mt-8 mb-10'>
          <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={50} />
          <p>Suprabbhat Sahoo</p>
        </div>

        <div className='bg-white p-3 text-center font-semibold text-[#4E84C1]'>
          <p>Dasebord</p>
        </div>
        <div className='p-3 text-center font-semibold text-[#4E84C1]'>
          <p>Classes</p>
        </div>
        <div className=' p-3 text-center font-semibold text-[#4E84C1]'>
          <p>Courses</p>
        </div>
      </div>

      {/* details dashboard */}
      <div className='m-5 ml-60 text-white flex flex-col gap-7'>
        <div className='text-[1.1rem] w-96 flex gap-44 items-center border-b-2 pb-5 mb-5'>
          <p>Amount: <span className=' text-green-500'>$500</span></p>
          <button>Withdrawl</button>
        </div>
        <p>Name: Suprabhat Sahoo</p>
        <p>Email: mainak@gmail.com</p>
        <div className='flex gap-3 items-center'>
          <p>Courses:</p>
          <p className=' bg-[#1671D8] py-1 px-2 rounded-xl'>Math</p>
          <p className=' bg-[#1671D8] py-1 px-2 rounded-xl'>Physics</p>
        </div>
      </div>
    </>
  )
}

export default TeacherDashboard