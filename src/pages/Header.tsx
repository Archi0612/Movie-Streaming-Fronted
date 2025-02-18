import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom'
const Header: React.FC= () => {
  const navigate = useNavigate();
    const handleSignIn = () => {
        console.log("Sign in button");
        navigate("/login")
      }
  return (
    <header className="header">
    <img src="src/assets/filmsterLogo.png" alt="Filmster Logo" className="logo" />
    <button className="sign-in-button" onClick={handleSignIn}>
      Sign In
    </button>
  </header>
  )
}

export default Header;