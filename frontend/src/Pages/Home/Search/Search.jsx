import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import Header from '../Header/Header'

function search() {
    const { subject } = useParams();
    const [data, setData] = useState(subject);
    const [course, setCourse] = useState([]);

    
    let SearchTeacher = async()=>{
        let Subject = data.toLowerCase();
        let Data = await fetch(`/api/course/${Subject}`)
        let response = await Data.json();
        if(response.statusCode == 200){
        setCourse(response.data)
        // console.log(response.data.length)
        }
        setData('')
    }

    useEffect(()=>{
        SearchTeacher();
    },[])


  return (
    <>
        <Header/>
        <div className='flex flex-col items-center justify-center'>
            <div className="search mb-10">
                <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5" width={30} alt="" />
                <input type="text" placeholder='Ex: Math ...' value={data} onChange={(e)=>setData(e.target.value)}/>
                <button className='w-32' onClick={SearchTeacher}>Find Teacher</button>
            </div>
            <div className='overflow-auto '>
                { course && (
                    course.map((Data)=>(
                    <div key={Data._id} className='relative bg-blue-600 p-4 gap-6 mb-3 flex items-center rounded-sm w-[75rem]'>
                        <div className='text-white bg-blue-900 p-2 rounded-md'>
                        {Data.coursename}  
                        </div>
                        <div className='text-gray-300'>{Data.enrolledteacher.Firstname}  {Data.enrolledteacher.Lastname}</div>
                        <div className='text-gray-900'><span className=' text-gray-900'>Desc :</span> {Data.description}</div>

                        <div>{Data.enrolledStudent.length}/20</div>
                    
                        <div className='absolute right-4'>
                            <div onClick={()=> alert('Pls login to enroll it')} className='text-white bg-blue-900 py-2 px-3 cursor-not-allowed'>Enroll Now</div>
                        </div>
                        
                    </div>
                    ))
                )}
            </div>
        </div>
    </>
  )
}

export default search