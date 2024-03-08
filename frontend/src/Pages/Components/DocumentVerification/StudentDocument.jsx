import React from 'react'
import Input from './InputCOmponent/Input'
import InputUpload from './Inputupload/InputUpload'







const StudentDocument = () => {


  


  return (
    <div>
     <h1 className='text-center font-sans text-2xl text-white mt-7 font-semibold'>Document  Verification (Teacher)</h1>
     <div className='border-[1.4px] border-white mt-5'></div>
     <h2 className='mt-5 text-[#4b8fdd] font-sans font-bold text-2xl ml-[200px] '>Personal Information</h2>
   
   
   
   
     <div className=' min-h-[100vh] w-[1200px]  mx-auto'>
      {/* input-1 */}
     <div className="flex justify-around mt-10">
      <Input placeholder={'FirstName'}  label={'FirstName'} />
      <Input placeholder={'LastName'}  label={'LastName'}/>
    </div>
      {/* input-2 */}
     <div className="flex justify-around mt-10">
      <Input placeholder={'Phone no.'}  label={'Phone no.'} />
      <Input placeholder={'Home Address'}  label={'Home Address'}/>
    </div>
      {/* input-3 */}
     <div className="flex justify-around mt-10">
      <Input placeholder={'Experience(in years)'}  label={'Experience(in years)'} />
      <InputUpload placeholder={'Upload Adhar'} label={'Upload Adhar'}/>
     </div>

    <div className='mt-20'>
    <table className="table-auto w-full">
      <tbody>
        <tr className="border">
          <td className="border-b-2 p-4"> <span>Secondary school</span></td>
          <td className="border-b-2 p-4"><span>10Th school</span></td>
          <td className="border-b-2 p-4">/<span>Total Marks in%</span></td>
          <td className="border-b-2 border-l-2  border-r-2 p-4"><span></span></td>
        </tr>
        <tr className="bg-transparent">
          <td className=" border-b-2 border-l-2 p-4"><span>Secondary school</span></td>
          <td className=" border-b-2  p-4"><span>Secondary school</span></td>
          <td className=" border-b-2 p-4 "><span>Secondary school</span></td>
          <td className=" border-b-2  border-l-2  border-r-2 p-4 "><span>Secondary school</span></td>
        </tr>
        <tr className="bg-transparent">
          <td className=" border-b-2 border-l-2 p-4"><span>Secondary school</span></td>
          <td className=" border-b-2 p-4"><span>Secondary school</span></td>
          <td className=" border-b-2 p-4 "><span>Secondary school</span></td>
          <td className=" border-b-2  border-l-2 p-4 border-r-2  "><span>Secondary school</span></td>
        </tr>
      </tbody> 
    </table>
  

    </div>
  
    </div>

  </div>
  )
}

export default StudentDocument
