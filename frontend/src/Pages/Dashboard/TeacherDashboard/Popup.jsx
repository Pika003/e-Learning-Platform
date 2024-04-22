import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function Popup({onClose, subject}) {
  const [desc, setDesc] = useState('');
  const { ID } = useParams();

  const addCourse = async()=>{
    if(desc == ''){
      alert('Fill The Description');
    }else{
      onClose();

      const data = {
        coursename: subject.toLowerCase(),
        description: desc
      }

      const response = await fetch(`/api/course/${subject}/create/${ID}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responesData = await response.json();

      console.log(responesData);
      alert(responesData.message);

    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
        <div className='bg-[#008280] w-96 h-[28rem] rounded-md'>
          <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div>
          <div className=' text-center my-10 text-white text-3xl font-semibold'>
            <p>{subject}</p>
          </div>
          <div className='m-5 flex flex-col gap-7 text-white text-xl'>
            <div>
              <label htmlFor="">Coursename : </label>
              <input 
                type="text" 
                className="bg-[#32B0AE] p-2 rounded-md w-52 border-0 outline-0"
                value={subject}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="">Teacher : </label>
              <input type="text" 
              className="bg-[#32B0AE] p-2 rounded-md w-52 ml-10 border-0 outline-0"
              />
            </div>
            <div>
              <label htmlFor="">Description : </label>
              <input type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="bg-[#32B0AE] p-2 rounded-md w-52 ml-3 border-0 outline-0" 
              />
            </div>
          </div>

          <div className='flex items-center justify-center mt-10'>
            <span onClick={addCourse} className='bg-[#335699] text-white px-10 py-4 rounded-md text-xl cursor-pointer'>
              Create Course
            </span>
          </div>
        </div>
    </div>
  )
}

export default Popup