import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

function AddClass({onClose}) {
    const { ID } = useParams();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState([]);
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [link, setLink] = useState("");
    const [note, setNote] = useState("");
    const [CourseId, setCourseId] = useState('');

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await fetch(`https://elearnbackend.onrender.com/api/course/Teacher/${ID}/enrolled`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const res = await response.json();
                // console.log(res.data);
                setCourses(res.data);
                setCourseId(res.data[0]._id)
            } catch (error) {
                setError(error.message)
            }
        };
        getCourses();
    },[]);

    const addCourses = async () => {
        let DateTime = `${date}T${time}:00Z`;

        const data = {
            title: note,
            timing: DateTime,
            link: link,
            status: 'upcoming',
        }

        if(note == '' || date == '' || link == '' || time == ''){
            alert('All fields are required !');
        }else{

            try {
                const response = await fetch(`https://elearnbackend.onrender.com/api/course/${CourseId}/teacher/${ID}/add-class`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const res = await response.json();
                alert(res.message);

                if(res.statusCode === 200){
                    onClose()
                }

            } catch (error) {
                setError(error.message)
            }
        }
        console.log(error);
    };

    /*const handaleSubmit = () =>{
        console.log(`${date}T${time}:00Z`);

        let A = '2024-04-24T06:45:00Z'
        console.log("Date: ",A.slice(0,10));
        console.log("Time: ",A.slice(12,19))
    }*/

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center'>
        <div className='w-[60%] h-[70%] bg-blue-gray-700 text-white rounded-md'>
            <div className=' absolute w-9 h-9 bg-[#E2B659] rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div>
            
            <div className='flex justify-center mt-5 gap-10 border-b-2 py-5'>
                <p className=' text-2xl '>Create next class</p>
                <select value={CourseId} onChange={(e)=>setCourseId(e.target.value)} className=' text-gray-900 rounded-md w-28 px-2 border-0 outline-0'>
                    {courses && (
                        courses.map(course => <option key={course._id} value={course._id}>{course.coursename}</option>)
                    )}
                </select>
            </div>

            <div className='flex items-center justify-around my-20 mx-5'>
                <div className='flex gap-5'>
                    <label htmlFor="" className='text-xl'>Date : </label>
                    <input value={date} onChange={(e)=> setDate(e.target.value)} type="date" className='border-0 outline-0 text-gray-900 py-1 px-3 rounded-sm'/>
                </div>

                <div className='flex gap-5'>
                    <label htmlFor="" className='text-xl'>Time : </label>
                    <input value={time} onChange={(e)=> setTime(e.target.value)} type="time" className='border-0 outline-0 text-gray-900 py-1 px-3 rounded-sm'/>
                </div>
            </div>

            <div className='m-10 flex items-center justify-center gap-20 mb-20'>
                <div className='flex gap-5'>
                    <label htmlFor="" className='text-xl'>Link : </label>
                    <input value={link} onChange={(e)=> setLink(e.target.value)} type="text" className='border-0 outline-0 text-gray-900 py-1 px-3 rounded-sm'/>
                </div>

                <div className='flex gap-5'>
                    <label htmlFor="" className='text-xl'>Title : </label>
                    <input value={note} onChange={(e)=> setNote(e.target.value)} type="text" className='border-0 outline-0 text-gray-900 py-1 px-3 rounded-sm'/>
                </div>
            </div>

            <div className='flex items-center justify-center'>
                <div onClick={addCourses} className='bg-[#E2B659] w-32 text-center py-2 rounded-sm text-brown-900 text-xl cursor-pointer'>Submit</div>
            </div>
                
        </div>
    </div>
  )
}

export default AddClass