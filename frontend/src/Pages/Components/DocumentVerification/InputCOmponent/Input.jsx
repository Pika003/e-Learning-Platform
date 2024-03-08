import React from 'react'

const Input = ({label ,placeholder}) => {
  return (
    <div>
    <label className='text-xl text-white ml-3 font-bold'>{label}:
     <input type="text"  name="inputField" placeholder={placeholder}
      class=" focus:border-blue-800 outline-none placeholder:text-white ring-5 block mt-3 w-full pl-10 pr-15 py-3 px-20 border-white border-2 text-white bg-transparent rounded-md"></input>
     </label>
    </div>
  )
}

export default Input
