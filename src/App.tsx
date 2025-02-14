import { useState } from 'react'
import './App.css'
import Signup from './pages/Authentication/Signup/Signup'
import Login from './pages/Authentication/Login/Login'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import ForgotPassword from './pages/Authentication/Forgot-Password/ForgotPassword'
import ResetPassword from './pages/Authentication/Reset-Password/ResetPassword'
import Home from './pages/Home'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </Router>
    </>
        
  )
}

export default App
