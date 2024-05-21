import React, { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from '../../Images/logo.svg'

const Admin = () => {
  const { data } = useParams();
  const navigator = useNavigate();

  const [StudentData, setStudentData] = useState([]);
  const [TeacherData, setTeacherData] = useState([]);
  const [adminID, setAdminID] = useState(null);
  const [error, setErrors] = useState("");

  const Approval = async(ID, type, approve)=>{
    try {
      const data = {
        Isapproved : approve
      }

      const response = await fetch(`https://elearnbackend.onrender.com/api/admin/${adminID}/approve/${type}/${ID}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response)

      if(type == "student"){
        setStudentData(pre => pre.filter((pre) => pre._id !== ID));

      }else if(type == "teacher"){
        setTeacherData(pre => pre.filter((pre) => pre._id !== ID));

      }

    } catch (error) {
      setErrors(error.message);
    }
  }

  const docDetails = async (type, ID) =>{
    navigator(`/VarifyDoc/${type}/${adminID}/${ID}`);
  }


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`https://elearnbackend.onrender.com/api/admin/${data}/approve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        } else {
          const result = await response.json();
           console.log(result)
          setStudentData(result.data.studentsforApproval);
          setTeacherData(result.data.teachersforApproval);
          setAdminID(result.data.admin._id);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, []);


  return (
    <div className="h-[100vh]">
      {/* Navbar */}
      <nav className="h-16 sm:h-20 md:h-24 lg:h-24  w-full bg-[#042439] flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <NavLink to='/'>
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="logo"
            className="w-14 sm:h-12 md:h-14 lg:h-16 xl:h-18"
          />
          <h1 className="text-2xl text-[#4E84C1] font-bold">
            Shiksharthee
          </h1>
        </div>
        </NavLink>
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

      {/* Main Section */}
      <div className="p-4 sm:p-8 md:p-12 lg:p-10 ">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-2xl border-b-2 font-semibold text-white border-white">
          All New Request
        </h1>
      </div>
      <div className="flex items-start justify-center gap-20">
        <div className="rounded-md">
          <h4 className="text-white bg-blue-gray-900 p-4 w-40">Student Request</h4>
          {
            StudentData.length > 0 ? StudentData.map((student) => (
              student.Isapproved === "pending" && (
                <div
                  key={student._id}
                  onClick={() => docDetails("student", student._id)}
                  className="flex justify-around items-center mt-8 p-8 bg-blue-gray-600 rounded-md cursor-pointer"
                >
                  <h1 className="text-[24px] text-1xl text-white mr-3">
                    {student.Firstname + " " + student.Lastname}
                  </h1>
                  <p>Status: <span>{student.Isapproved}</span></p>
                </div>
              )
            )) : null
          }
        </div>

        <div className="rounded-md">
        <h4 className="text-white bg-blue-gray-900 p-4 w-40">Teacher Request</h4>
        {
            TeacherData.length > 0 ? TeacherData.map((teacher) => (
              teacher.Isapproved === "pending" && (
                <div
                  key={teacher._id}
                  onClick={() => docDetails("teacher", teacher._id)}
                  className="flex justify-around items-center mt-8 p-8 bg-blue-gray-600 rounded-md cursor-pointer"
                >
                  <h1 className="text-[24px] text-1xl text-white mr-3">
                    {teacher.Firstname + " " + teacher.Lastname}
                  </h1>
                  <p>Status: <span>{teacher.Isapproved}</span></p>
                </div>
              )
            )) : null
          }
        </div>
        
        <div className="rounded-md">
        <h4 className="text-white bg-red-500 p-4 w-40">Rejected Request</h4>
          {
            TeacherData.length > 0 ? TeacherData.map((teacher) => (
              teacher.Isapproved === "rejected" && (
                <div
                  key={teacher._id}
                  onClick={() => docDetails("teacher", teacher._id)}
                  className="flex justify-around items-center mt-8 p-8 bg-blue-gray-600 rounded-md cursor-pointer"
                >
                  <h1 className="text-[24px] text-1xl text-white mr-3">
                    {teacher.Firstname + " " + teacher.Lastname}
                  </h1>
                  <p>Msg: <span>{teacher.Remarks}</span></p>
                </div>
              )
            )) : null
          }
          {
            StudentData.length > 0 ? StudentData.map((student) => (
              student.Isapproved === "rejected" && (
                <div
                  key={student._id}
                  onClick={() => docDetails("student", student._id)}
                  className="flex justify-around items-center mt-8 p-8 bg-blue-gray-600 rounded-md cursor-pointer"
                >
                  <h1 className="text-[24px] text-1xl text-white mr-3">
                    {student.Firstname + " " + student.Lastname}
                  </h1>
                  <p>Msg: <span>{student.Remarks}</span></p>
                </div>
              )
            )) : null
          }
        </div>
        
      </div>

    </div>
  );
};

export default Admin;