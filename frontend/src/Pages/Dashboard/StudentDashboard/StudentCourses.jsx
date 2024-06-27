import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Popup from './Popup';
import axios from 'axios';

function StudentCourses() {
  const { ID } = useParams();
  const [data, setdata] = useState([]);
  const [popup, setPopup] = useState(false);
  const [subDetails, setsubDetails] = useState({});
  const [subD, setsubD] = useState();

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
          console.log(user.data);

        } catch (error) {
          setError(error.message)
        }
      };
      getData();
  },[]);

  const openpopup = async(sub)=>{ 
    setsubDetails(sub);
    await axios.get(`/api/course/${sub.coursename}`)
      .then(res => {setPopup(true);
      setsubD(res.data.data)})
  }

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const Image = {
    "physics" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2",
    "chemistry" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95",
    "biology" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555",
    "math" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664",
    "computer" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272",
  }

  return (
    <>
    <div className='flex gap-10 pl-[12rem] mt-12 flex-wrap justify-center mb-2'>
        {data.map(sub => (
          <div key={sub._id} className="text-white rounded-md bg-[#042439] cursor-pointer text-center p-3 w-[15rem]" onClick={()=>openpopup(sub)}>
            <div className='flex justify-center items-center'>
              <img src={Image[sub.coursename]} alt={sub.coursename} width={60}/>
              <p>{sub.coursename.toUpperCase()}</p>
            </div>
            <p className='mt-5 text-gray-300 text-sm text-center px-2 '>{sub.description}</p>

            {sub.schedule && (
              <div>
                <p className='mt-2 text-blue-700 font-bold'>Timing:</p>
                {'[ '}
                {sub.schedule.map(daytime => {
                  return `${daysName[daytime.day]} ${Math.floor(daytime.starttime / 60)}:${daytime.starttime % 60 === 0 ? "00" : daytime.starttime % 60} - ${Math.floor(daytime.endtime/60)}:${daytime.endtime % 60 === 0 ? "00" : daytime.endtime % 60}`;
                }).join(', ')}
                {' ]'}
              </div>
            )}
        
            {/* <p className='mt-5 text-gray-300 text-sm text-center px-2 '>Fees : Rs. {price[sub.coursename]}</p> */}
          </div>
        ))}
    </div>
    {popup && (
      <Popup onClose={()=> setPopup(false)} subject={subDetails} allSubject={subD}/>
    )}
    </>
  )
}

export default StudentCourses