import React from 'react'

const Input = ({label ,placeholder,value,onChange}) => {
  return (
    <div className='flex flex-col'>
      <label className='text-white ml-7 font-bold'>{label}</label>
      <input type="text" name="inputField" placeholder={placeholder} value={value} onChange={onChange}
      className=" focus:border-blue-800 outline-none placeholder:text-[#e5e5e5]  mt-3 py-3 px-7  border-2 text-[#e5e5e5] bg-transparent rounded-md w-80">
      </input>
    </div>
  )
}

export default Input
