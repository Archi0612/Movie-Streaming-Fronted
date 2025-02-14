import React from 'react'
import "./Header.css"
const Header: React.FC= () => {
    const handleSignIn = () => {
        console.log("Sign in button")
      }
  return (
    <header className="header">
    <img src="src/assets/logo.png" alt="Filmster Logo" className="logo" />
    <button className="sign-in-button" onClick={handleSignIn}>
      Sign In
    </button>
  </header>
  )
}

export default Header;