import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { HeaderProps } from "../interfaces/movie.interface";

const Header: React.FC<HeaderProps> = ({ minimal }) => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    console.log("Sign in button");
    navigate("/login");
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <header className="header">
      <img
        src="src/assets/filmsterLogo.png"
        alt="Filmster Logo"
        className="logo"
        onClick={handleLogoClick}
      />
      {!minimal && (
        <button className="sign-in-button" onClick={handleSignIn}>
          Sign In
        </button>
      )}
    </header>
  );
};

export default Header;
