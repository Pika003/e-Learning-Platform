import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from '../../Images/logo.svg'

const Course = () => {
  const [courseReq, setCourseReq] = useState([]);

  const { data } = useParams();
  const navigator = useNavigate();


    // useEffect((data)=>{
    //     const Postrequest=async()=>{
    //         try{
    //          const response=await axios.post(`api/admin/${data}/approve/student/:studentID`)
    //         //  console.log(response);
    //      }catch(error){
    //         console.error('Error fetching course requests:', error);
    //      }
    //     }
    //     Postrequest();
    // },[])
 





  const formatDay = (day) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[day];
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  
  useEffect(() => {
    const fetchCourseRequests = async () => {
      try {
        const response = await axios.get(`/api/admin/${data}/approve/course`);
        console.log("dtat",response.data.data);
        setCourseReq(response.data.data);
      } catch (error) {
        console.error('Error fetching course requests:', error);
      }
    };

    fetchCourseRequests();
  }, [data]);


  // const handleAccept = async (id,info) => {
  //   console.log(id);
  //   try {
  //     const response = await fetch(`/api/admin/${data}/approve/course/${id}`, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ 
  //             Isapproved: true,
  //              Email:info.Email,
  //              Firstname:info.enrolledteacher,
  //        }),
  //     });
      
  //     console.log(response);
   
  //     if (response.ok) {
  //       setCourseReq(courseReq.filter(req => req._id !== id));
        
  //     }
  //   } catch (error) {
  //     console.error('Error approving course request:', error);
  //   }
  // };
  const handleAccept = async (id, info) => {
    console.log(id);
    console.log(info.Email)
    try {
      const response = await axios.post(`/api/admin/${data}/approve/course/${id}`, {
        Isapproved: true,
        email: info.Email,
        Firstname: info.enrolledteacher,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log(response);
     
      if (response.status === 200) {
        setCourseReq(courseReq.filter(req => req._id !== id));
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error approving course request:', error);
    }
  };
  
  
  const handleReject = async (id, info) => {
    console.log(id, info);
    try {
      const response = await axios.post(`/api/admin/${data}/approve/course/${id}`, {
        Isapproved: false,
        email: info.Email,
        Firstname: info.enrolledteacher,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log(response);
      
      if (response.status === 200) {
        setCourseReq(courseReq.filter(req => req._id !== id));
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error rejecting course request:', error);
    }
  };

  // const handleReject = async (id,info) => {
  //   console.log(id,info);
  //   try {
  //     const response = await fetch(`/api/admin/${data}/approve/course/${id}`, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ Isapproved: false,
  //              Email:info.Email,
  //              Firstname:info.enrolledteacher,
  //        }),
  //     });
  //    console.log(response);
  //     if (response.ok) {
  //       setCourseReq(courseReq.filter(req => req._id !== id));
  //     }
  //   } catch (error) {
  //     console.error('Error rejecting course request:', error);
  //   }
  // };





  return (
    <div className='h-[100vh]'>
           {/* Navbar */}
      <nav className="h-16 sm:h-20 md:h-24 lg:h-24  w-full bg-[#042439] flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
     
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <h1 onClick={()=>  navigator(`/admin/${data}`)} className="text-lg sm:text-xl md:text-2xl lg:text-3xl  text-blue-700 font-bold font-mono ml-2">
            ◀ Back
            </h1>
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative mr-4">
            <IoIosNotificationsOutline className="h-8 w-8 text-white" />
            <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </div>
          <button onClick={() => navigator('/')} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Logout
          </button>
        </div>
      </nav>

      {courseReq.length > 0 && (
        <div className="mt-3  text-gray-100 p-5">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courseReq.map((req, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-md shadow-[0_0_10px_white]">
                <h2 className="text-lg text-yellow-500 font-bold">{req.coursename.toUpperCase()}</h2>
                <p className="text-yellow-700 font-semibold">{req.description}</p>
                <div className="flex items-center mt-2">
                  <p className="text-yellow-300">Enrolled Teacher : </p>
                  <p className="text-white font-semibold pl-1"> {req.enrolledteacher.Firstname}  {req.enrolledteacher.Lastname}</p>
                 
                </div>
                <div className="flex  flex-col justify-start mt-2">
                  <p className="text-gray-400 text-xl font-bold mr-2">Timing:</p>
                  <div className="text-white">
                    {req.schedule.map((scheduleItem, idx) => (
                      <div key={idx}>
                        <p className="text-yellow-800">Day: {formatDay(scheduleItem.day)}</p>
                        <p className="text-yellow-300">Start Time: {formatTime(scheduleItem.starttime)}</p>
                        <p className="text-yellow-300">End Time: {formatTime(scheduleItem.endtime)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-yellow-300 mr-2">Approval Status:</p>
                  <p className={`text-white ${req.isapproved ? 'text-green-500' : 'text-red-500'}`}>
                    {req.isapproved ? 'Approved' : 'Pending'}
                  </p>
                </div>
                <div className='flex flex-row gap-3 mt-2'>
                  <button className='text-white bg-green-500'onClick={()=>handleAccept(req._id,{Email:req.enrolledteacher.Email,enrolledteacher:req.enrolledteacher.Firstname})}>Approve</button>
                  <button className='text-white bg-red-500' onClick={()=>handleReject(req._id,{Email:req.enrolledteacher.Email,enrolledteacher:req.enrolledteacher.Firstname})}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;

