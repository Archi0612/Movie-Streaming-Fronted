import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer:React.FC = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h5 className="footer-title">FilmSter</h5>
          <p className="footer-text">
          Filmster is a premium movie streaming platform offering a vast library of films, TV shows, and exclusive content across all genres.
          </p>
        </div>

        <div className="footer-section">
          <h5 className="footer-subtitle">Contacts</h5>
          <p className="footer-para">1004 Empire Business Hub, Science City, Sola, Ahmedabad, Gujarat 382350</p>
          <p className="footer-para">+91 9876543210</p>
          <p className="footer-para">cldmate.trainee.2025@gmail.com</p>
        </div>

        <div className="footer-section">
          <h5 className="footer-subtitle">Quick Links</h5>
          <div className="footer-links">
            <Link to="/home">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/series">Series</Link>
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </div>

        <div className="footer-section">
          <h5 className="footer-subtitle">Subscribe</h5>
          <p className="footer-label">
            Email<span className="required">*</span>
          </p>
          <input type="text" className="footer-input" placeholder="Enter your email" />
          <button className="footer-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
