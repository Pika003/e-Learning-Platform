import React, { useState } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { useEffect, } from 'react';
import { useParams } from 'react-router-dom';



const Admin = () => {

  const {data}=useParams();

  
  const [Data, setdata]=useState([])
  const [check,setCheck]=useState([])
   
  console.log("Check",check.length);


    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch(`/api/admin/${data}/approve`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }else{
              const result = await response.json();
              const data=Array.from(result.data.studentsforApproval)

              setCheck(data)


              console.log(result);
              const Student=result.data.studentsforApproval.id
              const Teacher=result.data.teachersforApproval.id
              
             
              
              if(result.data.studentsforApproval.id === Student ){
                setdata(result.data.studentsforApproval)
              }else if(result.data.teachersforApproval.id === Teacher){
                setdata(result.data.teachersforApproval)
              }
              
            }

          } catch (err) {
            console.log(err.message);
          }
        };
    
        getData();
      }, []);

     if(check === Data){// checking whether it is matching or not 
       console.log("true",data);
     }
   

 console.log("Data",Data.length);



  return (
    <div className='h-[100vh]'>
      {/* Navbar */}
      <nav className="h-16 sm:h-20 md:h-24 lg:h-24  w-full bg-[#042439] flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className='flex items-center'>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/53619c42501fb7619406ed947b38c5fa4f07597c" alt="logo" className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20" />
          <div>
   
      </div>
          <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl  text-blue-700 font-bold font-mono ml-2'>Title</h1>
        </div>
        <div className='flex items-center'>
          <div className='relative mr-4'>
            <IoIosNotificationsOutline className='h-8 w-8 text-white' />
            <span className="absolute top-0 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
          </div>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Admin</button>
        </div>
      </nav>

      {/* Main Section */}
      <div className='p-4 sm:p-8 md:p-12 lg:p-10 '>
        <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-3xl border-b-2 font-semibold text-white border-white'>All New Request</h1>
      </div>
      <div className='mx-auto h-[400px] w-[1400px] border-2 '>
       {
        //if it is matches the student approval then it will map the students in category in same list otherwise it will map in teacher category
          check === Data ? Data.map((student)=>{
           
            return <div className='flex justify-around mt-4 p-10'>
            <h1 className='text-[24px] text-2xl font-bold text-white'>{student.Firstname+student.Lastname}<span className='text-[24px] text-2xl font-bold text-white'>login-(Student)</span></h1>
            <div className='flex items-center'>
            <div className='px-5 py-1  bg-blue-600 mr-3 text-lg font-bold text-white ring-1 ring-inset ring-white rounded-lg hover:scale-95 hover:bg-blue-900'>Approved !</div>
            <div className='px-5 py-1  bg-red-600 text-lg font-bold text-white ring-1   ring-inset ring-white rounded-lg hover:scale-95 hover:bg-red-900'>Rejected !</div>
            </div>
            </div>


          })   :null

        }
      </div>
    </div>
  );
}

export default Admin;



{/* <div className='flex justify-around mt-4 p-10'>
<h1 className='text-[24px] text-2xl font-bold text-white'>Gopi Bhaduwa <span className='text-[24px] text-2xl font-bold text-white'>login-(Student)</span></h1>
<div className='flex items-center'>
<div className='px-5 py-1  bg-blue-600 mr-3 text-lg font-bold text-white ring-1 ring-inset ring-white rounded-lg hover:scale-95 hover:bg-blue-900'>Approved !</div>
<div className='px-5 py-1  bg-red-600 text-lg font-bold text-white ring-1   ring-inset ring-white rounded-lg hover:scale-95 hover:bg-red-900'>Rejected !</div>
</div>
</div> */}