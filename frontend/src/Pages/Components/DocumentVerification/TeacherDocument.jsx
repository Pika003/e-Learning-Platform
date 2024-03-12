import React, { useEffect, useState } from 'react';
import Input from './InputCOmponent/Input'
import InputUpload from './Inputupload/InputUpload';
import { useParams } from 'react-router-dom';

const TeacherDocument = () => {
  const [data, setdata] = useState([]);
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
      setdata(user.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [formData, setFormData] = useState({
    phoneNo: data.phoneNo || '',
    homeAddress: data.homeAddress || '',
    experience: data.experience || '',
    Secondary: data.Secondary || '',
    SecondaryMarks: data.SecondaryMarks || '',
    HigherSecondaryName: data.HigherSecondaryName || '',
    HigherSecondaryMarks: data.HigherSecondaryMarks || '',
    UgName: data.UgName || '',
    cgp: data.cgp || '',
    pgName: data.pgName || '',
    SgpName: data.SgpName || '',
    aadharFile: null,
    secondaryFile: null,
    higherSecondaryFile: null,
    ugFile: null,
    pgFile: null,
  });

  // Function to handle file input change
  function handleFileChange(fileType, e) {
    const selectedFile = e.target.files[0];
    setFormData({
      ...formData,
      [fileType]: selectedFile,
    });
  }

  // Function to handle input change
  function handleInputChange(field, value) {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  //posting to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formDataObj = new FormData();

    // Append data to the FormData object
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch(`/api/teacher/verification/${Data}`, {
        method: 'POST',
        body: formDataObj,
      });

      const responseData = await response.json();
      console.log('response', responseData);

      if (!response.ok) {
        console.log('!notdone');
      }
    } catch (err) {
      console.log('Error:', err);
    }

    console.log('Teacher form data:', formData);
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
          <Input
            label={"First Name"}
            placeholder={"First Name"}
            value={data.Firstname}
           readonly
          />
          <Input
            label={"Last Name"}
            placeholder={"Last Name"}
            value={data.Lastname}
            readonly
          />
          <Input
            label={"Phone No."}
            placeholder={"Phone No."}
            value={formData.phoneNo}
            onChange={(e) => handleInputChange("phoneNo", e.target.value)}
          />
        </div>

        <div className='flex flex-wrap gap-20 px-36'>
          <Input
            label={"Home Address"}
            placeholder={"Home Address"}
            value={formData.homeAddress}
            onChange={(e) => handleInputChange("homeAddress", e.target.value)}
          />
          <Input
            label={"Experience (years)"}
            placeholder={"Experience (years)"}
            value={formData.experience}
            onChange={(e) => handleInputChange("experience", e.target.value)}
          />
          <InputUpload
            label={"Upload Aadhar Card"}
            placeholder={"Upload Aadhar Card"}
            value={formData.aadharFile}
            onChange={(e) => handleFileChange('aadharFile', e)}
          />
        </div>

        <p className='text-[#4E84C1] p-5 px-10 pt-10'>Educational Information</p>
        <div className='border h-full mx-36 '>
          <div className='flex flex-row gap-7 '>
            <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
              <p className=' text-white text-sm'>Secondary School</p>
            </div>
            <Input
              placeholder={"10th School Name"}
              value={formData.Secondary}
              onChange={(e) => handleInputChange("Secondary", e.target.value)}
            />
            <Input
              placeholder={"Total Marks (%)"}
              value={formData.SecondaryMarks}
              onChange={(e) => handleInputChange("SecondaryMarks", e.target.value)}
            />
            <div className=' mt-[-1.5rem]'>
              <InputUpload
                placeholder={"Upload 10th Result"}
                value={formData.secondaryFile}
                onChange={(e) => handleFileChange('secondaryFile', e)}
              />
            </div>
          </div>
        
         

<div className='flex flex-row gap-7'>
  <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
    <p className=' text-white text-sm'>Higher Secondary</p>
  </div>
  <Input
    placeholder={"12th School Name"}
    value={formData.HigherSecondaryName}
    onChange={(e) => handleInputChange("HigherSecondaryName", e.target.value)}
  />
  <Input
    placeholder={"Total Marks (%)"}
    value={formData.HigherSecondaryMarks}
    onChange={(e) => handleInputChange("HigherSecondaryMarks", e.target.value)}
  />
  <div className=' mt-[-1.5rem]'>
    <InputUpload
      placeholder={"Upload 12th Result"}
      value={formData.higherSecondaryFile}
      onChange={(e) => handleFileChange('higherSecondaryFile', e)}
    />
  </div>
</div>
<hr />
<div className='flex flex-row gap-7'>
  <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm'>
    <p className=' text-white text-sm'>Under Graduation</p>
  </div>
  <Input
    placeholder={"U.G. College/University Name"}
    value={formData.UgName}
    onChange={(e) => handleInputChange("UgName", e.target.value)}
  />
  <Input
    placeholder={"CGP/SGP out of 10"}
    value={formData.cgp}
    onChange={(e) => handleInputChange("cgp", e.target.value)}
  />
  <div className=' mt-[-1.5rem]'>
    <InputUpload
      placeholder={"Upload U.G. Result"}
      value={formData.ugFile}
      onChange={(e) => handleFileChange('ugFile', e)}
    />
  </div>
</div>
<hr />
<div className='flex flex-row gap-7'>
  <div className=' bg-[#0D286F] p-[1rem] m-3 rounded-sm px-5'>
    <p className=' text-white text-sm'>Post Graduation</p>
  </div>
  <Input
    placeholder={"P.G. College/University Name"}
    value={formData.pgName}
    onChange={(e) => handleInputChange("pgName", e.target.value)}
  />
  <Input
    placeholder={"CGP/SGP out of 10"}
    value={formData.SgpName}
    onChange={(e) => handleInputChange("SgpName", e.target.value)}
  />
  <div className=' mt-[-1.5rem]'>
    <InputUpload
      placeholder={"Upload P.G. Result"}
      value={formData.pgFile}
      onChange={(e) => handleFileChange('pgFile', e)}
    />
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

