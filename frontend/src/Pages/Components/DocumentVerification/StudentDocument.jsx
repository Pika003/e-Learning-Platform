import React, { useEffect, useState } from 'react';
import Input from './InputCOmponent/Input';
import InputUpload from './Inputupload/InputUpload';
import { useParams } from 'react-router-dom';

const StudentDocument = () => {

 const { Data } =useParams()
 const [data,setdata]=useState([]);
 const [Error,SetError]=useState({});

 useEffect(() => {
  getData();
}, [Data]);

const getData = async () => {
  try {
    const response = await fetch(`/api/student/StudentDocument/${Data}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const user = await response.json();
    
    setdata(user.data)

  } catch (error) {
    console.error(error);
  }
};

console.log(data);

  const [phoneNo, setPhoneNo] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [highestEducation, setHighestEducation] = useState("");
  const [secondaryMarks, setSecondaryMarks] = useState("");
  const [secondarySchool, setSecondarySchool] = useState("");
  const [higherSecondarySchool, setHigherSecondarySchool] = useState("");
  const [higherSchoolMarks, setHigherSchoolMarks] = useState("");


  const [aadharFile, setAadharFile] = useState(null);
  const [secondaryFile, setSecondaryFile] = useState(null);
  const [higherSecondaryFile, setHigherSecondaryFile] = useState(null);


 








 function handleadharChange(e){
  
  const selectedFile = e.target.files[0];
  setAadharFile(selectedFile)
  
 }


 function handleSecondaryFile(e){
   const selectedFile=e.target.files[0];
   setSecondaryFile(selectedFile)
 }



function higherSecondarychange(e){
  const selectedFile=e.target.files[0];
  setHigherSecondaryFile(selectedFile)
}








  const handlePhoneNo = (e) => {
    setPhoneNo(e.target.value);
   
  };

  const handleAddress = (e) => {
    setHomeAddress(e.target.value);
  };

  const handleEducation = (e) => {
    setHighestEducation(e.target.value);
  };

  const handleSchool = (e) => {
    setSecondarySchool(e.target.value);
  };

  const handleMarks = (e) => {
    setSecondaryMarks(e.target.value);
  };

  const handleSecondarySchool = (e) => {
    setHigherSecondarySchool(e.target.value);
  };

  const handleSchoolMarks = (e) => {
    setHigherSchoolMarks(e.target.value);
  };


 async function handleSubmit(e){
    e.preventDefault();
    const data = {
      Phone: phoneNo,
      Address: homeAddress,
      HighestEducation: highestEducation,
      SecondarySchool: secondarySchool,
      HigherSecondarySchool: higherSecondarySchool,
      SecondaryMarks: secondaryMarks,
      HigherSchoolMarks: higherSchoolMarks,
      Aadhaar: aadharFile ? aadharFile.name : 'Not Uploaded',
      Secondary: secondaryFile ? secondaryFile.name : 'Not Uploaded',
      Higher: higherSecondaryFile ? higherSecondaryFile.name : 'Not Uploaded',
    };

    const backendurl='';
  
    try{
      const response=await fetch(backendurl,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

       
      const user=await response.json()
      if(response.ok){
        console.log('Posted Succesfully',user);
      }


    }catch(err){
    
      SetError(err.message);
      console.log(e.message);
  
    }
    console.log("gopi",data);

  }
  

  return (
    <>
      <div className='flex items-center gap-[25rem] px-32 py-2'>
        <div className='flex items-center gap-3'>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/53619c42501fb7619406ed947b38c5fa4f07597c"
            className="w-14" alt="" />
          <h1 className='text-3xl text-[#4E84C1] font-bold'>Title</h1>
        </div>
        <h2 className='text-white text-xl'>Document Verification (Student) </h2>
      </div>
      <hr />
      <p className='text-[#4E84C1] p-5 px-10'>Personal Information</p>
      <div className='flex flex-wrap gap-20 px-36 mb-10'>
        <Input label={"First Name"} placeholder={"First Name"} value={data.Firstname} readonly />
        <Input label={"Last Name"} placeholder={"Last Name"} value={data.Lastname} readonly  />
        <Input label={"Phone No."} placeholder={"Phone No."} value={phoneNo} onChange={handlePhoneNo} />
      </div>

      <div className='flex flex-wrap gap-20 px-36'>
        <Input label={"Home Address"} placeholder={"Home Address"} value={homeAddress} onChange={handleAddress} />
        <Input label={"Highest Education"} placeholder={"Highest Education"} value={highestEducation} onChange={handleEducation} />
        <InputUpload label={"Upload Aadhar Card"} placeholder={"Upload Aadhar Card"} value={aadharFile} onChange={(e)=>handleadharChange(e)}/>
      </div>
       
      <p className='text-[#4E84C1] p-5 px-10 pt-10'>Educational Information</p>
      <div className='border h-full mx-36 '>
        <div className='flex flex-row gap-7 '>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
            <p className=' text-white text-sm'>Secondary School</p>
          </div>
          <Input placeholder={"10th School Name"} value={secondarySchool} onChange={handleSchool} />
          <Input placeholder={"Total Marks (%)"} value={secondaryMarks} onChange={handleMarks} />
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload 10th Result"} value={secondaryFile} onChange={(e)=>handleSecondaryFile(e)} />
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-7'>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
            <p className=' text-white text-sm'>Higher Secondary</p>
          </div>
          <Input placeholder={"12th School Name"} value={higherSecondarySchool} onChange={handleSecondarySchool} />
          <Input placeholder={"Total Marks (%)"} value={higherSchoolMarks} onChange={handleSchoolMarks} />
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload 12th Result"} value={higherSecondaryFile} onChange={(e)=>higherSecondarychange(e)} />
          </div>
        </div>
      </div>
      <div className=' bg-[#0D286F] p-3 m-3 rounded-md absolute right-32 bottom-5 cursor-pointer' onClick={()=>handleSubmit}>
        <p className=' text-white text-sm'>Submit ▶️</p>
      </div>
    </>
  );
 };

export default StudentDocument;
