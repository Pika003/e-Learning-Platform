import React from 'react'

function Popup({onClose, subject}) {
    // console.log(subject);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
        <div className='bg-[#008280] w-96 h-[20rem] rounded-md'>
          <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div>
          <div className=' text-center my-5 text-gray-900 text-3xl font-semibold'>
            <p>{subject.coursename}</p>
          </div>
          <div className='text-center text-gray-900 px-3 mb-3'>
            <p>{subject.description}</p>
          </div>
          <hr />

          <div className='text-white text-center my-5 text-xl'>
            {/* <p className='text-gray-900'>Teacher :<span className='text-gray-200'> {subject.enrolledteacher.Firstname} {subject.enrolledteacher.Lastname}</span> </p> */}
          </div>

          {/* {subject.liveClasses.length != 0 && (
            <div>
                <div className='text-white text-center my-5 text-xl'>
                    <p className='text-gray-900'>Upcoming Classs : <span className='text-gray-200'>{subject.liveClasses[0].timing.slice(0,10)}</span></p>
                </div>

                <div className='text-white text-center my-5 text-xl'>
                    <p className='text-gray-900'>Time : <span className='text-gray-200'>{subject.liveClasses[0].timing.slice(12,19)}</span></p>
                </div>
            </div>
          )} */}
        </div>
    </div>
  )
}

export default Popup