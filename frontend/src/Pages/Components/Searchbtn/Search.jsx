import React, { useEffect, useState } from 'react'
import './Search.css'
import { useParams } from 'react-router-dom';

function Search() {
  // const {ID} = useParams();
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

  const handaleEnroll = async(courseName, id)=>{

    const data = await fetch(`/api/payment/course/${id}/${courseName}`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({fees : 500000})
    })

    const DATA = await data.json();
    // console.log(DATA);
    

    const Key = await fetch("/api/payment/razorkey", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
    })
    const response = await Key.json();

    const sendData = async(response)=>{
      console.log(response);
      const Info = {
        razorpay_payment_id : response.razorpay_payment_id,
        razorpay_order_id : DATA.id,
        razorpay_signature : DATA.receipt,
      }
     
      const data = await fetch(`/api/payment/confirmation/course/${id}`,{
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Info)
      })

      const res = await data.json();
      console.log(res);
    }

    const options = {
        "key": `${response.data.key}`,
        "amount": "500000",
        "currency": "INR",
        "name": "Shiksharthee",
        "description": "Enroll in a course",
        "image": "https://example.com/your_logo",
        "order_id": DATA.id,
        "handler": function asy(response){
          sendData(response);
        },
        "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
        },
        "notes": {
        "address": "Razorpay Corporate Office"
        },
        "theme": {
        "color": "#3399cc"
        }
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();

  }

  // let handaleEnroll = async(courseName, id)=>{
    // handlePayment();
    
    // try {
    //   let response = await fetch(`/api/course/${courseName}/${id}/add/student/${ID}`,{
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({}),
    //   })

    //   let res = await response.json();

    //   console.log(res);
      
    // } catch (error) {
    //   console.log(error);
    // }
  // }
  
  return (
    <>
      <div className="search mb-4">
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5" width={30} alt="" />
          <input type="text" placeholder='Ex: Zoology ...' value={data} onChange={(e)=>setData(e.target.value)}/>
          <button className='w-32' onClick={()=>SearchTeacher(data)}>Find Teacher</button>
      </div>
      <div className='overflow-auto h-56'>
        { course && (
          course.map((Data)=>(
            <div key={Data._id} className='relative bg-blue-600 p-4 gap-6 mb-3 flex items-center rounded-sm max-w-4xl'>
              <div className='text-white bg-blue-900 p-2 rounded-md'>
                {Data.coursename}  
              </div>
              <div className='text-gray-300'>{Data.enrolledteacher.Firstname}  {Data.enrolledteacher.Lastname}</div>
              <div className='text-gray-900'><span className=' text-black'>Desc :</span> {Data.description}</div>

              <div>{Data.enrolledStudent.length}/20</div>
              <div onClick={()=>handaleEnroll(Data.coursename, Data._id)} className='text-white bg-blue-900 py-2 px-3 absolute right-4 cursor-pointer'>Enroll Now</div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Search