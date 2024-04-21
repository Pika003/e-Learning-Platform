import React,{ useEffect, useState } from 'react'
import Camera from '../Images/Camera.png'
import Clock from '../Images/Clock.png'
import { useParams } from 'react-router-dom'

function StudentClasses() {
    const { ID } = useParams();
    const [data, setdata] = useState([]);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch(`/api/course/classes/student/${ID}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const user = await response.json();
            setdata(user.data.classes);
          } catch (error) {
            setError(error.message)
          }
        };
        getData();
    },[]);

  return (
    <div className='ml-60 mt-20 text-white flex justify-between mr-60'>
        <h1 className='absolute bottom-72 left-60 text-[#1671D8] text-2xl mt-4 mb-4 font-semibold'>Weekly Schedule</h1>

        <div className='h-[17rem] w-[30rem] overflow-auto '>
            {data.map((res) => res.liveClasses.length != 0 && 
                <div key={res._id} className='flex items-center mb-5'>
                    <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
                    <div className='ml-5 mr-10'>
                        <p className=' text-lg'>{res.coursename.toUpperCase()}<span className='text-black text-sm ml-3'>{res.liveClasses[0].timing.slice(0,10)}  {res.liveClasses[0].timing.slice(12,16)}</span></p>
                        
                        <span className='text-blue-500 text-sm ml-3'>{res.liveClasses[0].title.slice(0,35)} ...</span>
                    </div>
                    <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>upcoming</p>
                </div>
            )}
        </div>
        
        <div className='bg-white p-5 h-52 cursor-pointer rounded-lg text-black'>
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