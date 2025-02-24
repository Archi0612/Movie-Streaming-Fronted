import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/Sidebar';
import Footer from '../pages/Footer';

const MainLayout:React.FC = () => {
  return (
    <div className='body-wrapper'>
        <Sidebar />
        <Outlet />
        <Footer/>
    </div>
  )
}

export default MainLayout