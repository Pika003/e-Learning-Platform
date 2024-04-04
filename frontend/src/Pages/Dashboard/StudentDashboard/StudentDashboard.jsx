import React from 'react'
import teachingImg from '../../Images/Teaching.svg'
import Search from '../../Components/Searchbtn/Search'

function StudentDashboard() {
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

      {/* sidebar */}
      <div className='bg-[#071645] w-52 h-full absolute'>
        <div className='flex flex-col gap-5 text-xl items-center text-white mt-8 mb-10'>
          <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={50} />
          <p>Satyajit Maity</p>
        </div>

        <div className='bg-white p-3 text-center font-semibold text-[#4E84C1]'>
          <p>Teacher</p>
        </div>
        <div className='p-3 text-center font-semibold text-[#4E84C1]'>
          <p>Classes</p>
        </div>
        <div className=' p-3 text-center font-semibold text-[#4E84C1]'>
          <p>Courses</p>
        </div>
      </div>

      <div className='bg-[#008280] flex justify-between items-center'>
        <div className=' text-white font-semibold text-5xl ml-72'>
          <h1 className='mb-5'>Welcome to</h1>
          <h1 className='ml-10'>E Learning Platform</h1>
        </div>
        <div className='m-5 mr-20'>
          <img src={teachingImg} alt="teaching" width={300}/>
        </div>
      </div>
      <div className='ml-56'>
        <Search/>
      </div>
    </>
  )
}

export default StudentDashboard 