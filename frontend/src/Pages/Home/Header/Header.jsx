import './Header.css'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <>
    <header>
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
      <NavLink to='/Signup' className={({isActive}) => isActive ? "deactive" : "deactive"}><button>Login</button></NavLink>
    </header>
    </>
  )
}

export default Header