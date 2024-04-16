import React, { useEffect, useState } from 'react'
import './Search.css'

function Search() {
  const [data, setData] = useState('');
  const [course, setCourse] = useState([]);

  let SearchTeacher = async(sub)=>{
    let subject = sub.toLowerCase();
    let Data = await fetch(`/api/course/${subject}`)
    let response = await Data.json();
    if(response.statusCode == 200){
      setCourse(response.data)
      // console.log(response.data.length)
    }
    setData('')
  }
  
  return (
    <>
      <div className="search mb-10">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5" width={30} alt="" />
          <input type="text" placeholder='Ex: Zoology ...' value={data} onChange={(e)=>setData(e.target.value)}/>
          <button className='w-32' onClick={()=>SearchTeacher(data)}>Find Teacher</button>
      </div>
      { course && (
        course.map((Data)=>(
          <div key={Data._id} className=' bg-blue-600 p-5 gap-7 flex items-center rounded-sm'>
            <div className='text-white bg-blue-900 p-2 rounded-md'>
              {Data.coursename}  
            </div>
            <div>{Data.enrolledteacher[0].Firstname}  {Data.enrolledteacher[0].Lastname}</div>
            <div>Desc : {Data.description.slice(0,50)} ...</div>



            <div>{Data.enrolledStudent && Data.enrolledStudent.length}</div>
          </div>
        ))
      )}
    </>
  )
}

export default Search