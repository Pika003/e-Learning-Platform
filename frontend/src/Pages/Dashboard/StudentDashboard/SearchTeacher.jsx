import React, { useState } from 'react'
import Search from '../../Components/Searchbtn/Search'

function SearchTeacher() {
  const [popup, SetPopup] = useState(false);
  return (
    <div className='ml-56'>
        <Search/>
        {popup && (
          <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-[#5be0de] w-[70vw] px-14 py-10 rounded-sm'>
              {/* <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div> */}

              <p className='text-3xl'>Student Feedback Form</p>
              <p className=' border-b-2 py-2'>Please help us improve our courses by filling out this student feedback form. We highly appreciate your involvement. Thank you!</p>

              <div className='flex flex-col gap-3 my-5 pb-5 border-b-2'>
                <label>Teacher / Instructor</label>
                <input type="text" className='p-2'  placeholder='Teacher / Instructor Name'/>
                <label>Course Name</label>
                <input type="text" className='p-2'  placeholder='Course Name'/>
                <label>What you like about this course?</label>
                <input type="text" className='p-2'  placeholder=''/>
              </div>

              <p className='font-bold'>Please rate each following statement : </p>
              
              <div className='my-3'>
                <div className='flex gap-1'>
                  <p className='mr-[1.65rem]'>Level of effort invested in course</p>
                  <input name="group" type="radio" id='one'/> <label className='mr-3' htmlFor='one'>Very Good</label>
                  <input name="group" type="radio" id='two'/> <label className='mr-3' htmlFor='two'>Good</label>
                  <input name="group" type="radio" id='three'/> <label className='mr-3' htmlFor='three'>Fair</label>
                  <input name="group" type="radio" id='four'/> <label className='mr-3' htmlFor='four'>Poor</label>
                  <input name="group" type="radio" id='five'/> <label className='mr-3' htmlFor='five'>Very Poor</label>
                </div>
                <div className='flex gap-1 mt-1'>
                  <p className='mr-4'>Level of knowledge on the Subject</p>
                  <input name="group-0" type="radio" id='onec'/> <label className='mr-3' htmlFor='onec'>Very Good</label>
                  <input name="group-0" type="radio" id='twoc'/> <label className='mr-3' htmlFor='twoc'>Good</label>
                  <input name="group-0" type="radio" id='threec'/> <label className='mr-3' htmlFor='threec'>Fair</label>
                  <input name="group-0" type="radio" id='fourc'/> <label className='mr-3' htmlFor='fourc'>Poor</label>
                  <input name="group-0" type="radio" id='fivec'/> <label className='mr-3' htmlFor='fivec'>Very Poor</label>
                </div>
                <div className='flex gap-1 mt-1'>
                  <p className='mr-[5.48rem]'>Level of communication</p>
                  <input name="group-1" type="radio" id='oned'/> <label className='mr-3' htmlFor='oned'>Very Good</label>
                  <input name="group-1" type="radio" id='twod'/> <label className='mr-3' htmlFor='twod'>Good</label>
                  <input name="group-1" type="radio" id='threed'/> <label className='mr-3' htmlFor='threed'>Fair</label>
                  <input name="group-1" type="radio" id='fourd'/> <label className='mr-3' htmlFor='fourd'>Poor</label>
                  <input name="group-1" type="radio" id='fived'/> <label className='mr-3' htmlFor='fived'>Very Poor</label>
                </div>

              </div>

              <div className='py-3'>
                <p className='pb-3'>Would you recommend this course to other students?</p>
                <input name="radio-group" type="radio" id='one'/> <label htmlFor='one'>Yes</label>
                <input name="radio-group" type="radio" id='two' className='ml-5'/> <label htmlFor='two'>No</label>
              </div>

              <div className='flex justify-center'>
                <button className='w-[10rem]'>Submit Form</button>
              </div>
              
            </div>
          </div>
        )}
    </div> 
  )
}

export default SearchTeacher