import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Withdrawal from "./Withdrawal";

function DashboardTeacher() {
  const { ID } = useParams();
  const [data, setdata] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState([]);
  const [popup, setPopup] = useState(false);
  const [amount, setAmount] = useState(0);
  const [Tdec, setTeacherDetails] = useState(null);
  const [starCount, setStar] = useState(5);
  const [formPopup, setFormPopup] = useState(false);

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/Teacher/TeacherDocument/${ID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setdata(user.data);
        // console.log(user.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getData();
  }, []);

  useEffect(()=>{
    const getData = async()=>{
      const Data = await fetch('/api/teacher/teacherdocuments',{
        method: 'POST',
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({teacherID : data.Teacherdetails}),
      })
      const res = await Data.json();
      // console.log(res.data);
      setTeacherDetails(res.data);
    }

    getData();
  },[courses])

  useEffect(() => {
    const getAmount = async () => {
      try {
        const response = await fetch(`/api/payment/teacher/${ID}/balance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setAmount(user.data.newTeacher.Balance);
        // console.log(user)
      } catch (error) {
        // setError(error.message)
        console.log(error);
      }
    };
    getAmount();
  }, [amount, popup]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(`/api/course/Teacher/${ID}/enrolled`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const res = await response.json();
        setCourses(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getCourses();
  }, []);

  return (
    <>
      <div className="m-5 ml-60 text-white flex flex-col gap-7">
        <div className="text-[1.1rem] w-[30rem] flex gap-60 items-center border-b-2 pb-5 mb-5">
          {/* <p>Amount: <span className=" text-green-500">Rs. {amount}</span></p> */}
          <div className="bg-[#1671D8] p-3 rounded-md cursor-pointer">
            Details
          </div>
          <div
            onClick={() => setPopup(true)}
            className="bg-[#1671D8] p-3 rounded-md cursor-pointer"
          >
            Remuneration
          </div>
        </div>
        <div className="flex gap-32">
          <div className="flex flex-col gap-5">
            <p>Name: <span className="text-black">{data.Firstname} {data.Lastname}</span></p>
            {/* <p>Name: {data.Firstname} {data.Lastname} {'⭐'.repeat(starCount)}</p> */}
            <p>Email: <span className="text-black">{data.Email}</span></p>
            <p>Phone: <span className="text-black">{Tdec?.Phone}</span></p>
            <p>Address: <span className="text-black">{Tdec?.Address}</span></p>
            <p>Experience: <span className="text-black">{Tdec?.Experience} years</span></p>
          </div>
          <div>
            <div className="flex gap-3 flex-col">
              <p className="bg-[#1671D8] py-1 px-2 w-fit">Courses</p>
              {courses &&
                courses.map((course) => (
                  <p
                    key={course._id}
                    // className=" bg-[#1671D8] py-1 px-2 rounded-xl w-fit"
                    className="py-1 px-2 rounded-xl w-fit"
                  >
                    {course.coursename} :{" "}
                    <span className="text-black">
                      {" "}
                      Rs. {price[course.coursename]} per student
                    </span>
                  </p>
                ))}
            </div>
          </div>
        </div>

        {popup && <Withdrawal onClose={() => setPopup(false)} TA={amount} />}
        
        {formPopup && (
          <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-[#5be0de] text-black w-[70vw] px-14 py-10 rounded-sm'>
              {/* <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div> */}

              <p className='text-3xl'>Student Feedback Form</p>
              <p className=' border-b-2 py-2'>Please help us improve our courses by filling out this student feedback form. We highly appreciate your involvement. Thank you!</p>

              <div className='flex flex-col gap-3 my-5 pb-5 border-b-2'>
                <label>Teacher / Instructor</label>
                <input type="text" className='p-2'  placeholder='Teacher / Instructor Name'/>
                <label>Course Name</label>
                <input type="text" className='p-2'  placeholder='Course Name'/>
                <label>What you like about this course?</label>
                <input type="text" className='p-2'  placeholder='Duration'/>
              </div>

              <p className='font-bold'>Please rate each following statement : </p>
              
              <div className='my-3'>
                <div className='flex gap-1'>
                  <p className='mr-[1.65rem]'>Level of effort invested in course</p>
                  <input name="group" type="radio" id='one'/> <label className='mr-3' htmlFor='one'>Very Good</label>
                  <input name="group" type="radio" id='two'/> <label className='mr-3' htmlFor='two'>Good</label>
                  <input name="group" type="radio" id='three'/> <label className='mr-3' htmlFor='three'>Fair</label>
                  <input name="group" type="radio" id='four'/> <label className='mr-3' htmlFor='four'>Poor</label>
                  <input name="group" type="radio" id='five'/> <label className='mr-3' htmlFor='five'>Very Poor</label>
                </div>
                <div className='flex gap-1 mt-1'>
                  <p className='mr-4'>Level of knowledge on the Subject</p>
                  <input name="group-0" type="radio" id='onec'/> <label className='mr-3' htmlFor='onec'>Very Good</label>
                  <input name="group-0" type="radio" id='twoc'/> <label className='mr-3' htmlFor='twoc'>Good</label>
                  <input name="group-0" type="radio" id='threec'/> <label className='mr-3' htmlFor='threec'>Fair</label>
                  <input name="group-0" type="radio" id='fourc'/> <label className='mr-3' htmlFor='fourc'>Poor</label>
                  <input name="group-0" type="radio" id='fivec'/> <label className='mr-3' htmlFor='fivec'>Very Poor</label>
                </div>
                <div className='flex gap-1 mt-1'>
                  <p className='mr-[5.48rem]'>Level of communication</p>
                  <input name="group-1" type="radio" id='oned'/> <label className='mr-3' htmlFor='oned'>Very Good</label>
                  <input name="group-1" type="radio" id='twod'/> <label className='mr-3' htmlFor='twod'>Good</label>
                  <input name="group-1" type="radio" id='threed'/> <label className='mr-3' htmlFor='threed'>Fair</label>
                  <input name="group-1" type="radio" id='fourd'/> <label className='mr-3' htmlFor='fourd'>Poor</label>
                  <input name="group-1" type="radio" id='fived'/> <label className='mr-3' htmlFor='fived'>Very Poor</label>
                </div>

              </div>

              <div className='py-3'>
                <p className='pb-3'>Would you recommend this course to other students?</p>
                <input name="radio-group" type="radio" id='one'/> <label htmlFor='one'>Yes</label>
                <input name="radio-group" type="radio" id='two' className='ml-5'/> <label htmlFor='two'>No</label>
              </div>

              <div className='flex justify-center'>
                <button className='w-[10rem]'>Submit Form</button>
              </div>
              
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardTeacher;
