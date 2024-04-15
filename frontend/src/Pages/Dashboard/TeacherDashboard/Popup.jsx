import React from 'react'

function Popup({onClose}) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
        <div className='bg-blue-500 w-72 h-96 rounded-md'>
        <div className=' absolute m-[-1.1rem] text-white font-bold text-xl bg-black px-2 rounded-full cursor-pointer' onClick={onClose}>X</div>
        </div>
    </div>
  )
}

export default Popup