import React, { useEffect, useState } from 'react'

function Popup({onClose, subject, allSubject}) {
  const [details, setDetails] = useState({})
  const [Tdec, setTeacherDetails] = useState(null);
  const [starCount, setStar] = useState(5);

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };
    
  useEffect(()=>{
    const fetchData = async()=>{
      let actualdts = await allSubject?.filter( res => res._id === subject._id)
      setDetails(actualdts[0]?.enrolledteacher)
    }
    fetchData();
  },[details])

  useEffect(()=>{
    const getData = async()=>{
      const data = await fetch('/api/teacher/teacherdocuments',{
        method: 'POST',
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({teacherID : details.Teacherdetails}),
      })
      const res = await data.json();
      // console.log(res.data);
      setTeacherDetails(res.data);
    }

    getData();
  },[])

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
        <div className='bg-[#008280] w-96 h-[20rem] rounded-md'>
          <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div>
          <div className=' text-center my-5 text-gray-900 text-3xl font-semibold'>
            <p>{subject.coursename.toUpperCase()}</p>
          </div>
          <div className='text-center text-gray-900 px-3 mb-3'>
            <p>{subject.description}</p>
          </div>
          <hr />

          {details && (
            <div className='flex flex-col justify-center p-5 text-1xl gap-4'>
              <p>Teacher : <span className='text-white'>{details.Firstname} {details.Lastname}</span></p>
              {/* <p>Teacher : <span className='text-white'>{details.Firstname} {details.Lastname}</span> {'⭐'.repeat(starCount)}</p> */}
              <p>Email : <span className='text-white'>{details.Email}</span></p>
              {/* <p>Course Duration : <span className='text-white'>6 Months</span></p> */}
              <p>Fees : <span className='text-white'>Rs. {price[subject.coursename]} per month / per student</span></p>
            </div>
          )}
        </div>
    </div>
  )
}

export default Popup