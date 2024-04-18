import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

function AddClass({onClose}) {
    const { ID } = useParams();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState([]);

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
    <div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center'>
        <div className='w-[60%] h-[70%] bg-blue-gray-700 text-white rounded-md'>
            <div className=' absolute w-9 h-9 bg-[#E2B659] rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div>
            
            <div className='flex justify-center mt-5 gap-10 border-b-2 py-5'>
                <p className=' text-2xl '>Create next class</p>
                <select name="subject" id="subject" className=' text-gray-900 rounded-md w-28 px-2 border-0 outline-0'>
                    {courses && (
                        courses.map(course => <option key={course._id} value={course.coursename}>{course.coursename}</option>)
                    )}
                </select>
            </div>

            <div className='flex items-center justify-around my-20 mx-5'>
                <div className='flex gap-5'>
                    <label htmlFor="" className='text-xl'>Date : </label>
                    <input type="date" className='border-0 outline-0 text-gray-900 py-1 px-3 rounded-sm'/>
                </div>

                <div className='flex gap-5'>
                    <label htmlFor="" className='text-xl'>Time : </label>
                    <input type="time" className='border-0 outline-0 text-gray-900 py-1 px-3 rounded-sm'/>
                </div>
            </div>

            <div className='m-10 flex items-center justify-center gap-20 mb-20'>
                <div className='flex gap-5'>
                    <label htmlFor="" className='text-xl'>Link : </label>
                    <input type="text" className='border-0 outline-0 text-gray-900 py-1 px-3 rounded-sm'/>
                </div>

                <div className='flex gap-5'>
                    <label htmlFor="" className='text-xl'>Note : </label>
                    <input type="text" className='border-0 outline-0 text-gray-900 py-1 px-3 rounded-sm'/>
                </div>
            </div>

            <div className='flex items-center justify-center'>
                <div className='bg-[#E2B659] w-32 text-center py-2 rounded-sm text-brown-900 text-xl cursor-pointer'>Submit</div>
            </div>

        </div>
    </div>
  )
}

export default AddClass