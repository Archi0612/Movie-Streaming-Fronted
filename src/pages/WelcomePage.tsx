import React from "react";
import "./WelcomePage.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    console.log("Get Started clicked");
    navigate("/home");
  };

  return (
    <div className="welcome-container">
      <Header />
      {/* Hero Section */}
      <div
        className="welcome-section"
        style={{ backgroundImage: "url(src/assets/background.jpg)" }}
      >
        <div className="welcome-overlay"></div>

        <div className="welcome-content">
          <h1 className="welcome-title">Welcome to Filmster</h1>
          <p className="welcome-subtitle">Watch unlimited Movies </p>
          <button className="start-button" onClick={handleGetStarted}>
            Begin Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
