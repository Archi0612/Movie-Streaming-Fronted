import React from "react";
import "./WelcomePage.css";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="welcome-container">
      {/* Hero Section */}
      <div
        className="welcome-section"
      >
        <div className="welcome-overlay"></div>

        <div className="welcome-content">
          <h1 className="welcome-title">Welcome to Filmster</h1>
          <p className="welcome-subtitle">Watch unlimited Movies, TV shows and more </p>
          <button className="start-button" onClick={handleGetStarted}>
            Begin Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
