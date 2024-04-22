import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Popup from './Popup';

function StudentCourses() {
  const { ID } = useParams();
  const [data, setdata] = useState([]);
  const [popup, setPopup] = useState(false);
  const [subDetails, setsubDetails] = useState({});

  useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(`/api/course/student/${ID}/enrolled`, {
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

  const openpopup = (sub)=>{
    setPopup(true);
    setsubDetails(sub);
  }

  const Image = {
    "chemistry" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95",
    "biology" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555",
    "math" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664",
    "computer" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272",
  }

  return (
    <>
    <div className='flex gap-10 pl-48 mx-48 mt-12 flex-wrap justify-center'>
        {data.map(sub => (
          <div key={sub._id} className="subject cursor-pointer" onClick={()=>openpopup(sub)}>
            <img src={Image[sub.coursename]} alt={sub.coursename}/>
            <p>{sub.coursename}</p>
          </div>
        ))}
    </div>
    {popup && (
      <Popup onClose={()=> setPopup(false)} subject={subDetails}/>
    )}
    </>
  )
}

export default StudentCourses