import React, { useEffect, useState } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import logo from "../../Images/logo.svg";
import Success from "./Success";

function Search() {
  const [data, setData] = useState("");
  const [course, setCourse] = useState([]);
  const [courseID, setCourseID] = useState([]);
  const [popup, setPopup] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const { ID } = useParams();
  const [openTM, setOpenTM] = useState(false);
  const [Tdec, setTeacherDetails] = useState(null);
  const [tname, setTname] = useState({});

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const closePopup = () => {
    setPopup(false);
    window.location.reload();
  };

  const openTeacherDec = async(id,fname,lname,sub)=>{
    setTname({fname,lname,sub});

    const data = await fetch('/api/teacher/teacherdocuments',{
        method: 'POST',
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({teacherID : id}),
    })

    const res = await data.json();
    console.log(res.data);
    setTeacherDetails(res.data);
    setOpenTM(true);
  }

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
        setCourseID(user.data);
        console.log(user.data);
        setIdArray(prevIdArray => [...prevIdArray, ...user.data.map(res => res._id)]);
        // Using a callback in setIdArray to ensure you're working with the most up-to-date state
  
      } catch (error) {
        console.log(error.message)
      }
    };
    getData();
  }, []);
  

  const SearchTeacher = async (sub) => {
    const subject = sub.toLowerCase();
    const Data = await fetch(`/api/course/${subject}`);
    const response = await Data.json();
    if (response.statusCode === 200) {
      setCourse(response.data);
      // console.log(response.data);
    }
    setData("");
  };

  const handleEnroll = async (courseName, id) => {
    let check = await fetch(
      `/api/course/${courseName}/${id}/verify/student/${ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({}),
      }
    );
    const res = await check.json();

    console.log(res);

    if(res.statusCode === 200){

    const data = await fetch(`/api/payment/course/${id}/${courseName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fees: price[courseName]*100 }),
    });

    const DATA = await data.json();
    // console.log(DATA.data.id)

    const Key = await fetch("/api/payment/razorkey", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await Key.json();

    const options = {
      key: response.data.key,
      amount: price[courseName]*100,
      currency: "INR",
      name: "Shiksharthee",
      description: "Enroll in a course",
      image: logo,
      order_id: DATA.data.id, // Include the order_id from the response
      handler: async (response) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

        // Send the payment details to the server for verification
        const verificationData = {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        };

        const verificationResponse = await fetch(
          `/api/payment/confirmation/course/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(verificationData),
          }
        );

        const res = await verificationResponse.json();
        console.log(res.statusCode);
        if (res.statusCode === 200) {
          try {
            let response = await fetch(
              `/api/course/${courseName}/${id}/add/student/${ID}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                // body: JSON.stringify({}),
              }
            );

            let res = await response.json();
            console.log(res);
            setPopup(true);
          } catch (error) {
            console.log(error);
          }
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    }else{
      alert(res.message)
    }
  };

  return (
    <>
      <div className="search mb-4">
        <img
          src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5"
          width={30}
          alt=""
        />
        <input
          type="text"
          placeholder="Ex: Math ..."
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button className="w-32" onClick={() => SearchTeacher(data)}>
          Find Teacher
        </button>
      </div>
      <div className="overflow-auto">
        {course &&
          course.map((Data) => (
            <div
              key={Data._id}
              className="relative bg-blue-600 p-4 gap-6 mb-3 flex  rounded-sm max-w-4xl h-20 items-start"
            >
              <div className="h-fit font-bold text-blue-900">
                {Data.coursename.toUpperCase()}
              </div>
              <div onClick={()=>openTeacherDec(Data.enrolledteacher.Teacherdetails, Data.enrolledteacher.Firstname, Data.enrolledteacher.Lastname, Data.coursename)} className="text-gray-300 cursor-pointer font-bold">
                {Data.enrolledteacher.Firstname} {Data.enrolledteacher.Lastname}
              </div>
              <div className="text-gray-900">
                <span className="text-black">Desc :</span> {Data.description}
              </div>
              <div>{Data.enrolledStudent.length}/20</div>
              { idArray.includes(Data._id) ? (
                <div onClick={()=> alert("You Already enrolled, pls find other course")}
                  className="text-white bg-green-900 py-2 px-3 absolute right-4 cursor-not-allowed">
                  Already Enrolled
                </div>
              ) : Data.enrolledStudent.length < 20 ? (
                <div
                  onClick={() => handleEnroll(Data.coursename, Data._id)}
                  className="text-white bg-blue-900 py-2 px-3 absolute right-4 cursor-pointer"
                >
                  Enroll Now
                </div>
              ) : (
                <div onClick={()=> alert("Already Full, pls find other course")}
                  className="text-white bg-red-900 py-2 px-3 absolute right-4 cursor-not-allowed">
                  Already Full
                </div>
              )}
              <div className="absolute bottom-2">
                <span className='mt-2 font-bold'>Timing : </span>
                {'[ '}
                {Data.schedule.map(daytime => {
                  return `${daysName[daytime.day]} ${Math.floor(daytime.starttime / 60)}:${daytime.starttime % 60 === 0 ? "00" : daytime.starttime % 60} - ${Math.floor(daytime.endtime/60)}:${daytime.endtime % 60 === 0 ? "00" : daytime.endtime % 60}`;
                }).join(', ')}
                {' ]'}
              </div>
            </div>
          ))}
      </div>

      {openTM && (
          <div key='1' className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
              <div className='bg-[#008280] w-96 h-[21rem] rounded-md'>
                  <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={()=>setOpenTM(false)}>✖️</div>
                  <div className='flex flex-col justify-center p-5 text-1xl gap-4'>
                  <p className='text-center text-2xl bg-blue-900 rounded-sm py-1 text-white mb-5'>{tname.sub.toUpperCase()}</p>
                  <p>Teacher Name : <span className='text-white'>{tname.fname} {tname.lname}</span></p>
                  {/* <p>Teacher Name : <span className='text-white'>{tname.fname} {tname.lname}</span> ⭐⭐⭐</p> */}
                  <p>Education : <span className='text-white'>Postgraduate from <b className='text-gray-200'>{Tdec.PGcollege}</b> with {Tdec.PGmarks} CGPA</span></p>
                  <p>Experience : <span className='text-white'>{Tdec.Experience} years</span></p>
                  <p>Course : <span className='text-white'>{tname.sub.toUpperCase()}</span></p>
                  {/* <p>Course Duration : <span className='text-white'>6 Months</span></p> */}
                  {/* <p>Fees : <span className='text-white'>Rs. {price[tname.sub]}</span></p> */}
                  </div>
              </div>
          </div>
      )}

      {popup && <Success onClose={closePopup} />}
    </>
  );
}

export default Search;
