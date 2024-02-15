import './Header.css'

function Header() {
  return (
    <>
    <header>
      <div className="logo">
        <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/53619c42501fb7619406ed947b38c5fa4f07597c" alt="logo" />
        <h3>LOGO</h3>
      </div>
      <div className="link-nav">
        <ul>
          <li>Home</li>
          <li>Courses</li>
          <li>About</li>
          <li>Contact us</li>
        </ul>
      </div>
      <button>Sign up</button>
    </header>

    </>
  )
}

export default Header
