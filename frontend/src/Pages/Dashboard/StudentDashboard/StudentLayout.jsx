import React from 'react'
import {Outlet} from 'react-router-dom'
import StudentDashboard from './StudentDashboard'

function StudentLayout() {
  return (
    <>
    <StudentDashboard/>
    <Outlet/>
    </>
  )
}

export default StudentLayout