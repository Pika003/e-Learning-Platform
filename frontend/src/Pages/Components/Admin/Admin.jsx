import React, { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";

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

      const response = await fetch(`/api/admin/${adminID}/approve/${type}/${ID}`, {
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
        const response = await fetch(`/api/admin/${data}/approve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        } else {
          const result = await response.json();
          //  console.log(result)
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
        <div className="flex items-center">
          <img
            src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/53619c42501fb7619406ed947b38c5fa4f07597c"
            alt="logo"
            className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18"
          />
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  text-blue-700 font-bold font-mono ml-2">
            Title
          </h1>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <IoIosNotificationsOutline className="h-8 w-8 text-white" />
            <span className="absolute top-0 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
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
            StudentData.length > 0 ? StudentData.map((student) => {
                  return (
                    <div key={student._id} className="flex justify-around mt-8 p-8 bg-blue-gray-600 rounded-md">
                      <div className="mr-3" onClick={()=>docDetails("student", student._id)}><FaCircleInfo size={"35"}/></div>
                      <h1 className="text-[24px] text-1xl text-white mr-3">
                        {student.Firstname +" "+ student.Lastname}
                      </h1>
                      <div className="flex items-center">
                        <div className="px-5 py-1  bg-blue-600 mr-3 text-lg font-bold text-white ring-1 ring-inset ring-white rounded-lg hover:scale-95 hover:bg-blue-900" onClick={()=>Approval(student._id, "student", "approved")}>
                          Approved !
                        </div>
                        <div className="px-5 py-1  bg-red-600 text-lg font-bold text-white ring-1   ring-inset ring-white rounded-lg hover:scale-95 hover:bg-red-900" onClick={()=>Approval(student._id, "student", "rejected")}>
                          Rejected !
                        </div>
                      </div>
                    </div>
                  );
                })
            : null
          }
        </div>

        <div className="rounded-md">
        <h4 className="text-white bg-blue-gray-900 p-4 w-40">Teacher Request</h4>
          {
            TeacherData.length > 0 ? TeacherData.map((teacher) => {
                  return (
                    <div key={teacher._id} className="flex justify-around my-8 p-8 bg-blue-gray-600 rounded-md">
                      <div className="mr-3" onClick={()=>docDetails("teacher", teacher._id)}><FaCircleInfo size={"35"}/></div>
                      <h1 className="text-[24px] text-1xl text-white mr-3">
                        {teacher.Firstname +" "+ teacher.Lastname}
                      </h1>
                      <div className="flex items-center">
                        <div className="px-5 py-1  bg-blue-600 mr-3 text-lg font-bold text-white ring-1 ring-inset ring-white rounded-lg hover:scale-95 hover:bg-blue-900" onClick={()=>Approval(teacher._id, "teacher", "approved")}>
                          Approved !
                        </div>
                        <div className="px-5 py-1  bg-red-600 text-lg font-bold text-white ring-1   ring-inset ring-white rounded-lg hover:scale-95 hover:bg-red-900" onClick={()=>Approval(teacher._id, "teacher", "rejected")}>
                          Rejected !
                        </div>
                      </div>
                    </div>
                  );
                })
            : null
          }
        </div>
      </div>

    </div>
  );
};

export default Admin;