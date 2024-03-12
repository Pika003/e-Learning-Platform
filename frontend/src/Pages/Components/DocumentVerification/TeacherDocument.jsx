import React, { useEffect, useState } from 'react';
import Input from './InputCOmponent/Input';
import InputUpload from './Inputupload/InputUpload';
import { useParams } from 'react-router-dom';

const TeacherDocument = () => {

  const [data,setdata]=useState([])

    const { Data } = useParams();
 
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      try {
        const response = await fetch(`/api/teacher/TeacherDocument/${Data}`, {
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
  

   

  const [phoneNo, setPhoneNo] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [Secondary,SecondarySchool]=useState('');
  const [SecondaryMarks,SetsecondaryMarks] = useState('');
  const [HigherSecondaryName,setHigherSecondaryName]=useState('')
  const [HigherSecondaryMarks,setHigherSecondaryMarks]=useState('')
  const [UgName,setUgName]=useState('')
  const [cgp,setCgp]=useState('')
  const [pgName,setPgName]=useState('')
  const [SgpName,setSgpName]=useState('')

  const [aadharFile, setAadharFile] = useState(null);
  const [secondaryFile, setSecondaryFile] = useState(null);
  const [higherSecondaryFile, setHigherSecondaryFile] = useState(null);
  const [ugFile, setUgFile] = useState(null);
  const [pgFile, setPgFile] = useState(null);
  
  
 
 

  // Function to handle file input change
  function handleFileChange(fileType, e) {
    const selectedFile = e.target.files[0];

    switch (fileType) {
      case 'aadhar':
        setAadharFile(selectedFile);
        break;
      case 'secondary':
        setSecondaryFile(selectedFile);
        break;
      case 'higherSecondary':
        setHigherSecondaryFile(selectedFile);
        break;
      case 'ug':
        setUgFile(selectedFile);
        break;
      case 'pg':
        setPgFile(selectedFile);
        break;
      default:
        break;
    }
  }


  //posting to backend

  const handleSubmit = async (e) => {
    e.preventDefault();


 const details={

        Phone:phoneNo,
        Address:homeAddress,
        Experience:experience,
        SecondarySchool:Secondary,
        HigherSchool:HigherSecondaryName,
        UGcollege:UgName,
        PGcollege:pgName,
        SecondaryMarks:SecondaryMarks,
        HigherMarks:HigherSecondaryMarks,
        UGmarks:cgp,
        PGmarks:SgpName,
        Aadhaar:aadharFile ,
        Secondary: secondaryFile ,
        Higher: higherSecondaryFile ,
        UG: ugFile ,
        PG: pgFile ,

    }



    
    

    try {
    
      const response = await fetch(`/api/teacher/verification/${Data}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      const responseData=await response.json()
console.log('response',responseData);

      if (!response.ok) {
       console.log('!notdone');
      }    

    } catch (err) {
      console.log('Error:', err)
    }

    console.log('Teacher form data:', details);
  };

  return (
    <>
      <div className='flex items-center gap-[25rem] px-32 py-2'>
        <div className='flex items-center gap-3'>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/53619c42501fb7619406ed947b38c5fa4f07597c"
            className="w-14" alt="" />
          <h1 className='text-3xl text-[#4E84C1] font-bold'>Title</h1>
        </div>
        <h2 className='text-white text-xl'>Document Verification (Teacher) </h2>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
      <p className='text-[#4E84C1] p-5 px-10'>Personal Information</p>
      <div className='flex flex-wrap gap-20 px-36 mb-10'>
        <Input label={"First Name"} placeholder={"First Name"} value={ data.Firstname }   />
        <Input label={"Last Name"} placeholder={"Last Name"} value={ data.Lastname }/>
        <Input label={"Phone No."} placeholder={"Phone No."} onChange={(e) => setPhoneNo(e.target.value)} />
      </div>

      <div className='flex flex-wrap gap-20 px-36'>
        <Input label={"Home Address"} placeholder={"Home Address"} onChange={(e) => setHomeAddress(e.target.value)} />
        <Input label={"Experience (years)"} placeholder={"Experience (years)"} onChange={(e) => setExperience(e.target.value)} />
        <InputUpload label={"Upload Aadhar Card"} placeholder={"Upload Aadhar Card"}  value={aadharFile} onChange={(e) => handleFileChange('aadhar', e)} />
      </div>
      
      <p className='text-[#4E84C1] p-5 px-10 pt-10'>Educational Information</p>
      <div className='border h-full mx-36 '>
        <div className='flex flex-row gap-7 '>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
            <p className=' text-white text-sm'>Secondary School</p>
          </div>
          <Input placeholder={"10th School Name"} onChange={(e)=>SecondarySchool(e.target.value)} />
          <Input placeholder={"Total Marks (%)"}  onChange={(e)=>SetsecondaryMarks(e.target.value)}  />
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload 10th Result"} value={secondaryFile} onChange={(e) => handleFileChange('secondary', e)} />
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-7'>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
            <p className=' text-white text-sm'>Higher Secondary</p>
          </div>
          <Input placeholder={"12th School Name"} onChange={(e)=>setHigherSecondaryName(e.target.value)} />
          <Input placeholder={"Total Marks (%)"} onChange={(e)=>setHigherSecondaryMarks(e.target.value)}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload 12th Result"} value={higherSecondaryFile}onChange={(e) => handleFileChange('higherSecondary', e)} />
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-7'>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
            <p className=' text-white text-sm'>Under Graduation</p>
          </div>
          <Input placeholder={"U.G. College/University Name"} onChange={(e)=>setUgName(e.target.value)} />
          <Input placeholder={"CGP/SGP out of 10"} onChange={(e)=>setCgp(e.target.value)}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload U.G. Result"} value={ugFile} onChange={(e) => handleFileChange('ug', e)} />
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-7'>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm px-5'>
            <p className=' text-white text-sm'>Post Graduation</p>
          </div>
          <Input placeholder={"P.G. College/University Name"} onChange={(e)=>setPgName(e.target.value)}/>
          <Input placeholder={"CGP/SGP out of 10"}onChange={(e)=>setSgpName(e.target.value)}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload P.G. Result"} value={pgFile} onChange={(e) => handleFileChange('pg', e)} />
          </div>
        </div>
      </div>
      <div className=' bg-[#0D286F] p-3 m-6 rounded-md w-[5.7rem] ml-[85%] cursor-pointer' >
        <button className=' text-white text-sm' type='Submit' >Submit ▶️</button>
      </div>
      </form>
    </>
  );
};

export default TeacherDocument;
