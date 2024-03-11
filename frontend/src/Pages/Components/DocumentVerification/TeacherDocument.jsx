import React, { useState } from 'react';
import Input from './InputCOmponent/Input';
import InputUpload from './Inputupload/InputUpload';

const TeacherDocument = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [experience, setExperience] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data object
    const data = {
      FirstName: firstName,
      LastName: lastName,
      Phone: phoneNo,
      Address: homeAddress,
      Experience: experience,
      Aadhaar: aadharFile ? aadharFile.name : 'Not Uploaded',
      Secondary: secondaryFile ? secondaryFile.name : 'Not Uploaded',
      Higher: higherSecondaryFile ? higherSecondaryFile.name : 'Not Uploaded',
      UG: ugFile ? ugFile.name : 'Not Uploaded',
      PG: pgFile ? pgFile.name : 'Not Uploaded',
    };

    
    const backendurl = 'YOUR_BACKEND_URL'; 

    try {
    
      const response = await fetch(backendurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


    } catch (err) {
      console.error('Error:', err)
    }

    console.log('Teacher form data:', data);
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
      <p className='text-[#4E84C1] p-5 px-10'>Personal Information</p>
      <div className='flex flex-wrap gap-20 px-36 mb-10'>
        <Input label={"First Name"} placeholder={"First Name"} onChange={(e) => setFirstName(e.target.value)} />
        <Input label={"Last Name"} placeholder={"Last Name"} onChange={(e) => setLastName(e.target.value)} />
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
          <Input placeholder={"10th School Name"} />
          <Input placeholder={"Total Marks (%)"}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload 10th Result"} value={secondaryFile} onChange={(e) => handleFileChange('secondary', e)} />
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-7'>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
            <p className=' text-white text-sm'>Higher Secondary</p>
          </div>
          <Input placeholder={"12th School Name"} />
          <Input placeholder={"Total Marks (%)"}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload 12th Result"} value={higherSecondaryFile}onChange={(e) => handleFileChange('higherSecondary', e)} />
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-7'>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
            <p className=' text-white text-sm'>Under Graduation</p>
          </div>
          <Input placeholder={"U.G. College/University Name"} />
          <Input placeholder={"CGP/SGP out of 10"}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload U.G. Result"} value={ugFile} onChange={(e) => handleFileChange('ug', e)} />
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-7'>
          <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm px-5'>
            <p className=' text-white text-sm'>Post Graduation</p>
          </div>
          <Input placeholder={"P.G. College/University Name"} />
          <Input placeholder={"CGP/SGP out of 10"}/>
          <div className=' mt-[-1.5rem]'>
            <InputUpload placeholder={"Upload P.G. Result"} value={pgFile} onChange={(e) => handleFileChange('pg', e)} />
          </div>
        </div>
      </div>
      <div className=' bg-[#0D286F] p-3 m-6 rounded-md w-[5.7rem] ml-[85%] cursor-pointer' onClick={handleSubmit}>
        <p className=' text-white text-sm'>Submit ▶️</p>
      </div>
    </>
  );
};

export default TeacherDocument;
