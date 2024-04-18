import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function DashboardTeacher() {
  const { ID } = useParams();
  const [data, setdata] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/Teacher/TeacherDocument/${ID}`, {
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

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(`/api/course/Teacher/${ID}/enrolled`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const res = await response.json();
        setCourses(res.data);
      } catch (error) {
        setError(error.message)
      }
    };
    getCourses();
   },[]);

  return (
    <>
        <div className='m-5 ml-60 text-white flex flex-col gap-7'>
            <div className='text-[1.1rem] w-[30rem] flex gap-44 items-center border-b-2 pb-5 mb-5'>
                <p>Amount: <span className=' text-green-500'>Rs. 5000</span></p>
                <div className='bg-[#1671D8] p-3 rounded-md'>Remuneration</div>
            </div>
                <p>Name: {data.Firstname} {data.Lastname}</p>
                <p>Email: {data.Email}</p>
            <div className='flex gap-3 items-center'>
                <p>Courses:</p>
                {courses && (
                  courses.map((course) => <p key={course._id} className=' bg-[#1671D8] py-1 px-2 rounded-xl'>{course.coursename}</p>)
                )}

                {/* <p className=' bg-[#1671D8] py-1 px-2 rounded-xl'>Math</p>
                <p className=' bg-[#1671D8] py-1 px-2 rounded-xl'>Physics</p> */}
            </div>
        </div>
    </>
  )
}

export default DashboardTeacher