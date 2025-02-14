import './App.css'
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes/routes'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))
          }
          {/* <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} /> */}
        </Routes>
      </Router>
=======
import AppRoute from './routes/AppRouter'
function App() {
  return (
    <>
        <AppRoute/>
>>>>>>> b60aff51afaa578a2895b3de9113ac5009004969
    </>

  )
}

export default App


