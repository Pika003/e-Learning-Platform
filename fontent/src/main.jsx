import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import Header from './Pages/Home/Header/Header'
import Landing from './Pages/Home/Landing/Landing'
import LeftSec from './Pages/Login/leftSec'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <Landing/> 
    <LeftSec/>
  </React.StrictMode>,
)
