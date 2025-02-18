import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar';

const MainLayout:React.FC = () => {
  return (
    <div className='body-wrapper'>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default MainLayout