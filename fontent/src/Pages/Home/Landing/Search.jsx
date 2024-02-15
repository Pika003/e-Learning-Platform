import React from 'react'
import './Landing.css'

function Search() {
  return (
    <div className="search">
        <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5" width={30} alt="" />
        <input type="text" placeholder='Ex: Zoology ...'/>
        <button>Find Teacher</button>
    </div>
  )
}

export default Search