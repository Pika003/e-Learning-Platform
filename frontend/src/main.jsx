import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import Landing from './Pages/Home/Landing/Landing'
import About from './Pages/Home/About/About'
import Contact from './Pages/Home/Contact/Contact'
import Courses from './Pages/Home/Courses/Courses'
import LeftSec from './Pages/Login/leftSec'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<LeftSec/>}/>
      <Route path='/signup' element={<LeftSec/>}/>
      <Route path='/courses' element={<Courses/> }/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
