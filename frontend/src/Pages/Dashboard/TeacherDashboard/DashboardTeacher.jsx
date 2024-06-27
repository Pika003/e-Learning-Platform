import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Withdrawal from "./Withdrawal";
import { TbMessage2Star } from "react-icons/tb";

function DashboardTeacher() {
  const { ID } = useParams();
  const [data, setdata] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState([]);
  const [popup, setPopup] = useState(false);
  const [notification, setNotification] = useState(false);
  const [amount, setAmount] = useState(0);
  const [subjectForm, setsubjectForm] = useState('Math');
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

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
        console.log(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getCourses();
  }, []);

  return (
    <>
      <div className="m-5 ml-60 text-white flex flex-col gap-7">
        <div className="text-[1.1rem] w-[30rem] flex gap-60 items-center">
          {/* <p>Amount: <span className=" text-green-500">Rs. {amount}</span></p> */}
          <div className="bg-[#1671D8] p-3 rounded-md cursor-pointer">
            Details
          </div>
          <div
            // onClick={() => setPopup(true)}
            className="bg-[#1671D8] p-3 rounded-md cursor-pointer"
          >
            Remuneration
          </div>
          {/* <div className="flex items-center gap-2 ml-28 bg-[#1671D8] p-3 rounded-md cursor-pointer" onClick={()=>setNotification(prev => !prev)}>
            <span>Notifications</span>
            <TbMessage2Star />
          </div> */}
        </div>
        <hr />
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
                courses.filter((course) => course.isapproved)
                .map((course) => (
                  <p
                    key={course._id}
                    // className=" bg-[#1671D8] py-1 px-2 rounded-xl w-fit"
                    className="py-1 px-2 rounded-xl w-fit"
                  >
                    {course.coursename} :{" "}
                    <span className="text-black">
                      {" [ "}{course.schedule.map(days => `${daysOfWeek[days.day]} ${Math.floor(days.starttime/60)}:${(days.starttime%60 === 0 ? "00":days.starttime%60)} - ${Math.floor(days.endtime/60)}:${(days.endtime%60 === 0 ? "00" : days.endtime%60)}`).join(', ')}{" ] "}
                    </span>
                    <span className="text-black font-bold">
                      {" => "}
                      Rs. {price[course.coursename]} per student / per month
                    </span>
                  </p>
                ))}
            </div>
          </div>
          <div className="ml-28">
            {/* {notification && (
              show all notifications
              example
              <div>
                <p>course : Math</p>
                <p>Timing : sun,Mon,tue</p>
                <p>status : pending</p>
                <p>message : sbcxbbdjbd</p>
              </div>
            )} */}
          </div>
        </div>

        {popup && <Withdrawal onClose={() => setPopup(false)} TA={amount} />}
        
        {formPopup && (
          <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-[#5be0de] text-black w-[70vw] px-14 py-10 rounded-sm'>
              {/* <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div> */}

              <p className='text-3xl'>Teacher Feedback Form</p>
              <p className=' border-b-2 py-2'>We highly appreciate your involvement. Please help us improve by filling out this teacher feedback form. Thank you!</p>

              <div className='flex flex-col gap-3 my-5 pb-5 border-b-2'>
                <label>Full Name</label>
                <input type="text" className='p-2'  placeholder='Teacher / Instructor Name'/>
                <label>Course Name</label>

                <input type="text" className='p-2'  placeholder='Course Name'/>
                {/* <input type="text" value={subjectForm} readOnly className='p-2'  placeholder='Course Name'/> */}

                <label>Number of Years Teaching ?</label>
                <input type="text" className='p-2'  placeholder='in years'/>
              </div>

              <div className='py-3 flex flex-col justify-center items-center'>
                <p className='pb-3 text-center'>Do you have suggestions on what we can do to provide you with a better service?</p>
                <textarea className=" rounded-md w-[80%] h-32 p-2" placeholder="Type here ..."></textarea>
              </div>

              <div className='flex justify-center mt-3'>
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
