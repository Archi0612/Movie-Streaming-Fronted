import React from 'react'
import "./ErrorPage.css"
import { useNavigate } from 'react-router-dom';
const ErrorPage:React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="error-container">
      <img src="/Error/ErrorPage.png" alt="Error-Page Image" className='error-image' />
      <h2 className='error-title'>Awww... Don&apos;t Cry</h2>
      <h3 className="error-subtitle">It&apos;s Just a 404 Error!</h3>
      <p className="error-message">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button className="error-button" onClick={()=>navigate("/home")}>Go Back Home</button>
    </div>
    </>
  )
}

export default ErrorPage;