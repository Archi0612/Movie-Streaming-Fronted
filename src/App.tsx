import './App.css'
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
    </>

  )
}

export default App
