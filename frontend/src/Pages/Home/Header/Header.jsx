import './Header.css'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <>
    <header className="flex items-center justify-evenly bg-[#042439] w-full fixed z-10 gap-[20rem]">
      <div className="logo">
        <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/53619c42501fb7619406ed947b38c5fa4f07597c" alt="logo" />
        <h3><NavLink to='/' className={({isActive}) => isActive ? "active" : "active"}>LOGO</NavLink></h3>
      </div>
      <div className="link-nav">
        <ul>
          <li><NavLink to='/' className={({isActive}) => isActive ? "active" : "deactive" }> Home </NavLink></li>
          <li><NavLink to='/courses' className={({isActive}) => isActive ? "active" : "deactive"}> Courses </NavLink></li>
          <li><NavLink to='/about' className={({isActive}) => isActive ? "active" : "deactive"}> About </NavLink></li>
          <li><NavLink to='/contact' className={({isActive}) => isActive ? "active" : "deactive"}> Contact us </NavLink></li>
        </ul>
      </div>
      <div className='flex gap-6'>
        <NavLink to='/login' className={({isActive}) => isActive ? "deactive" : "deactive"}><button>Login</button></NavLink>
        <NavLink to='/signup' className={({isActive}) => isActive ? "deactive" : "deactive"}><button>Signup</button></NavLink>
      </div>
    </header>
    <div className="gapError"></div>
    </>
  )
}

export default Header
