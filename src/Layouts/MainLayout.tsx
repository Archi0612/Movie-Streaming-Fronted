import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/Sidebar';
import Footer from '../pages/Footer';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const userRole = "admin";
  return (
    <div className='main-layout'>
      <div className='main-layout-container'>
        <Sidebar userRole={userRole} />
        <main className='content1'>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout