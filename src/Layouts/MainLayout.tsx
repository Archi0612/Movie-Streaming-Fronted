import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/Sidebar';
import Footer from '../pages/Footer';

const MainLayout:React.FC = () => {
  const userRole = "admin";
  return (
    <div className='main-layout'>
        <Sidebar userRole={userRole}/>
        <main className='content1'>
        <Outlet />
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout