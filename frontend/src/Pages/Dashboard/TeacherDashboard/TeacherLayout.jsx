import React from 'react'
import {Outlet} from 'react-router-dom'
import TeacherDashboard from './TeacherDashboard'

function TeacherLayout() {
  return (
    <>
    <TeacherDashboard/>
    <Outlet/>
    </>
  )
}

export default TeacherLayout