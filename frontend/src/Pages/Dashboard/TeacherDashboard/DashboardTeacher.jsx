import React from 'react'

function DashboardTeacher() {
  return (
    <>
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

export default DashboardTeacher