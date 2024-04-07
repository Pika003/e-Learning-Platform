import React from 'react'
import Camera from './Images/Camera.png'
import Clock from './Images/Clock.png'

function StudentClasses() {
  return (
    <div className='ml-60 mt-20 text-white flex justify-between mr-60'>
        <h1 className='absolute bottom-72 left-60 text-[#1671D8] text-2xl mt-4 font-semibold'>My Schedule</h1>

        <div>
            <div className='flex items-center mb-5'>
                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
                <div className='ml-5 mr-10'>
                    <p className=' text-lg'>Sandwip Sir <span className='text-blue-500 text-sm'>  MATH</span> </p>
                    <p className='text-[#018280] text-sm'>23 Jan Tue</p>
                </div>
                <p className='text-sm bg-[#DE4242] p-2 rounded-lg'>completed</p>
            </div>
            <div className='flex items-center mb-5'>
                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
                <div className='ml-5 mr-10'>
                    <p className=' text-lg'>Rahul Kr Sir <span className='text-blue-500 text-sm'>  Physics</span> </p>
                    <p className='text-[#018280] text-sm'>27 Jan Wed</p>
                </div>
                <p className='text-sm bg-[#56BD31] p-2 rounded-lg'>ongoing</p>
            </div>
            <div className='flex items-center mb-5'>
                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
                <div className='ml-5 mr-10'>
                    <p className=' text-lg'>Vupend Sir <span className='text-blue-500 text-sm'>  Biology</span> </p>
                    <p className='text-[#018280] text-sm'>29 Jan Sun</p>
                </div>
                <p className='text-sm bg-[#464CE5] p-2 rounded-lg'>upcoming</p>
            </div>
        </div>
        
        <div className='bg-white p-5 rounded-lg text-black'>
            <div className='flex gap-8 items-center mb-5 mt-2'>
                <img src={Clock} alt="clock" width={50} />
                <span className='text-[#4E84C1] text-3xl font-semibold'>02 : 15 : 10</span>
            </div>
            <div className='flex gap-12 items-center'>
                <div className='ml-3'>
                    <p>Your next lesson with</p>
                    <p className='text-[#018280] text-3xl font-semibold'>Mr. Hamed</p>
                    <p className=' text-light-blue-700'>Biology</p>
                </div>
                <img src={Camera} alt="Camera" width={70}/>
            </div>
        </div>
    </div>
  )
}

export default StudentClasses