import React, { useEffect, useState } from 'react'
import teachingImg from '../../Images/Teaching.svg'
import { NavLink, useParams, useNavigate } from 'react-router-dom'


function StudentDashboard() {
  const { ID } = useParams();
  const navigator = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/Student/StudentDocument/${ID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const user = await response.json();
        setdata(user.data);
      } catch (error) {
        setError(error.message)
      }
    };
    getData();
   },[]);

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
          <p onClick={() => navigator('/')}>logout</p>
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
          <p>{data.Firstname} {data.Lastname}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <NavLink to = {`/Student/Dashboard/${ID}/Search`} className={({isActive}) => isActive ? "bg-white p-3 px-[4.61rem] text-center font-semibold text-[#4E84C1]" : "p-3 text-center font-semibold text-[#4E84C1]" }> 
          Teacher
          </NavLink>

          <NavLink to = {`/Student/Dashboard/${ID}/Classes`} className={({isActive}) => isActive ? "bg-white p-3 px-[4.61rem] text-center font-semibold text-[#4E84C1]" : "p-3 text-center font-semibold text-[#4E84C1]" }> 
          Classes
          </NavLink>

          <NavLink to = {`/Student/Dashboard/${ID}/Courses`} className={({isActive}) => isActive ? "bg-white p-3 px-[4.61rem] text-center font-semibold text-[#4E84C1]" : "p-3 text-center font-semibold text-[#4E84C1]" }> 
          Courses
          </NavLink>
        </div>

      </div>
    </>
  )
}

export default StudentDashboard 