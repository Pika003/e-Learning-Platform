import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function VarifyDoc() {
    const { type, adminID, ID } = useParams();
    const [data, setData] = useState(null);
    const navigator = useNavigate();

    const Approval = async(id, type, approve)=>{
        try {
          const data = {
            Isapproved : approve
          }
    
          const response = await fetch(`/api/admin/${adminID}/approve/${type}/${id}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        
          navigator(`/admin/${adminID}`);
    
        } catch (error) {
          console.log(error.message);
        }
      }

    useEffect(() => {
        const getData = async () => {
            try {
                const docData = await fetch(`/api/admin/${adminID}/documents/${type}/${ID}`);
                const response = await docData.json();
                setData(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err.message);
            }
        };
        getData();
    }, []);

    return (
        <>
            <nav className="h-16 sm:h-20 md:h-24 lg:h-24  w-full bg-[#042439] flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="flex items-center">
                    <h1 onClick={()=>  navigator(`/admin/${adminID}`)} className="text-lg sm:text-xl md:text-2xl lg:text-3xl  text-blue-700 font-bold font-mono ml-2">
                    ◀ Back
                    </h1>
                </div>
                <div><h2 className='text-2xl text-white font-bold'>Document  Details</h2></div>
                <div className="flex items-center">
                    <button onClick={() => navigator('/')} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Logout
                    </button>
                </div>
            </nav>

            {type === "student" && data && data.theStudent && (
                <>
                    <div className='flex gap-10 text-white justify-center mt-5 text-[1.3rem]'>
                        <p>Full Name : <span className='text-[#042439]'>{data.theStudent.Firstname} {data.theStudent.Lastname}</span></p>
                        <p>Phone No : <span className='text-[#042439]'>{data.studentDocs.Phone}</span></p>
                        <p>Highest Education : <span className='text-[#042439]'>{data.studentDocs.Highesteducation}</span></p>
                        <p>Address : <span className='text-[#042439]'>{data.studentDocs.Address}</span></p>
                    </div>

                    <div className='flex mt-10 justify-center gap-20 flex-wrap text-[#042439] font-bold'>
                        <div className='m-5 flex flex-col gap-3'>
                            <img src={data.studentDocs.Secondary} alt="Secondary" width={500}/>
                            <p>10th Marksheet  <span className='text-[#8DE855]'>: {data.studentDocs.SecondaryMarks}%</span></p>
                        </div>
                        <div className='m-5 flex flex-col gap-3'>
                            <img src={data.studentDocs.Higher} alt="Secondary" width={500}/>
                            <p>12th Marksheet  <span className='text-[#8DE855]'>: {data.studentDocs.HigherMarks}%</span></p>
                        </div>
                        <div className='m-5 flex flex-col gap-3'>
                            <img src={data.studentDocs.Aadhaar} alt="Secondary" width={500}/>
                            <p>Aadhar Card </p>
                        </div>
                        <div className='flex items-end mb-10'>
                            <div className="flex items-center">
                                <div className="px-5 py-1  bg-blue-600 mr-3 text-lg font-bold text-white ring-1 ring-inset ring-white rounded-lg hover:scale-95 hover:bg-blue-900" onClick={()=>Approval(data.theStudent._id, "student", "approved")}>
                                Approved !
                                </div>
                                <div className="px-5 py-1  bg-red-600 text-lg font-bold text-white ring-1   ring-inset ring-white rounded-lg hover:scale-95 hover:bg-red-900" onClick={()=>Approval(data.theStudent._id, "student", "rejected")}>
                                Rejected !
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {type === "teacher" && data && data.theTeacher &&  (
                <>
                    <div className='flex gap-10 text-white justify-center mt-5 text-[1.3rem]'>
                        <p>Full Name : <span className='text-[#042439]'>{data.theTeacher.Firstname} {data.theTeacher.Lastname}</span></p>
                        <p>Phone No : <span className='text-[#042439]'>{data.teacherDocs.Phone}</span></p>
                        <p>Experience : <span className='text-[#042439]'>{data.teacherDocs.Experience} years</span></p>
                        <p>Address : <span className='text-[#042439]'>{data.teacherDocs.Address}</span></p>
                    </div>

                    <div className='flex mt-10 justify-center gap-20 flex-wrap text-[#042439] font-bold'>
                        <div className='m-5 flex flex-col gap-3'>
                            <img src={data.teacherDocs.Secondary} alt="Secondary" width={500}/>
                            <p>10th Marksheet  <span className='text-[#8DE855]'>: {data.teacherDocs.SecondaryMarks}%</span></p>
                        </div>
                        <div className='m-5 flex flex-col gap-3'>
                            <img src={data.teacherDocs.Higher} alt="Secondary" width={500}/>
                            <p>12th Marksheet  <span className='text-[#8DE855]'>: {data.teacherDocs.HigherMarks}%</span></p>
                        </div>
                        <div className='m-5 flex flex-col gap-3'>
                            <img src={data.teacherDocs.UG} alt="Secondary" width={500}/>
                            <p>U.G. Marksheet  <span className='text-[#8DE855]'>: {data.teacherDocs.UGmarks}</span></p>
                        </div>
                        <div className='m-5 flex flex-col gap-3'>
                            <img src={data.teacherDocs.PG} alt="Secondary" width={500}/>
                            <p>P.G. Marksheet  <span className='text-[#8DE855]'>: {data.teacherDocs.PGmarks}</span></p>
                        </div>
                        <div className='m-5 flex flex-col gap-3'>
                            <img src={data.teacherDocs.Aadhaar} alt="Secondary" width={500}/>
                            <p>Aadhar Card </p>
                        </div>
                        <div className='flex items-end mb-10'>
                            <div className="flex items-center">
                                <div className="px-5 py-1  bg-blue-600 mr-3 text-lg font-bold text-white ring-1 ring-inset ring-white rounded-lg hover:scale-95 hover:bg-blue-900" onClick={()=>Approval(data.theTeacher._id, "teacher", "approved")}>
                                Approved !
                                </div>
                                <div className="px-5 py-1  bg-red-600 text-lg font-bold text-white ring-1   ring-inset ring-white rounded-lg hover:scale-95 hover:bg-red-900" onClick={()=>Approval(data.theTeacher._id, "teacher", "rejected")}>
                                Rejected !
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default VarifyDoc;
