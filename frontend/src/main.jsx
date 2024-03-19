import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import Landing from './Pages/Home/Landing/Landing'
import About from './Pages/Home/About/About'
import Contact from './Pages/Home/Contact/Contact'
import Courses from './Pages/Home/Courses/Courses'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import AdminLogin from './Pages/Login/AdminLogin'

import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import StudentDocument from './Pages/Components/DocumentVerification/StudentDocument'
import TeacherDocument from './Pages/Components/DocumentVerification/TeacherDocument'
import VarifyEmail from './Pages/Components/VarifyEmail/VarifyEmail'
import Rejected from './Pages/Response/Rejected'
import Pending from './Pages/Response/Pending'
import Admin from './Pages/Components/Admin/Admin'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/StudentDocument/:Data' element={<StudentDocument/>}/>
      <Route path='/TeacherDocument/:Data' element={<TeacherDocument/>}/>
      <Route path='/courses' element={<Courses/> }/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/varifyEmail' element={<VarifyEmail/>}/>
      <Route path='/adminLogin/' element={<AdminLogin/>}/>
      <Route path='/rejected' element={<Rejected/>}/>
      <Route path='/pending' element={<Pending/>}/>
      <Route path='/admin/:data' element={<Admin/>}/>
    </Route>
 )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

