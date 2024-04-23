import React from 'react'

function Success({onClose}) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
        <div className='flex flex-col items-center gap-5 p-5 justify-center h-80 w-92 rounded-md bg-green-500 text-white'>
            <img src="https://img.icons8.com/?size=48&id=70yRC8npwT3d&format=png" width={80} alt="" />
            <h1 className=' text-xl text-green-900 font-semibold'>Payment Successful</h1>
            <p className='text-center text-gray-900'>Payment successfully completed! Now you can join the classes. <br />Wishing a happy journey with Shiksharthee
            </p>
            <div onClick={onClose} className=' bg-blue-900 p-2 rounded-md cursor-pointer'>Back to Dashboard</div>
        </div>
    </div>
  )
}

export default Success