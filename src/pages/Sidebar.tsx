import { useState } from "react";
import { FaHome, FaFilm, FaTv, FaEnvelope } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo.png"
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    console.log("logo clicked");
    navigate("/home");
  }
  const handleProfileClick = () => {
    console.log("profile clicked");
    navigate("/profile-page");
  }

  return (
    <div 
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-logo">
        {/* {!isExpanded ? (<img src={logo1} className="logo1"/>):(<img src={logo1} className="logo2"/>)} */}
        <img src={logo} className="logo-1" onClick={handleLogoClick}/>
      </div>
      <ul className={`sidebar-list ${isExpanded? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}>
        <li onClick={() => {
          navigate("/home");
        }}>
          <FaHome size={26}/>
          {isExpanded && <span className="Link-text">Home</span>}
        </li>
        <li>
          <FaFilm size={26}/>
          {isExpanded && <span className="Link-text">Movies</span>}
          
        </li>
        <li>
          <FaTv size={26} />
          {isExpanded && <span className="Link-text">Series</span>}
        </li>
        <li>
          <BiCategory size={26} />
          {isExpanded && <span className="Link-text">Genres</span>}
        </li>
        <li>
          <FaEnvelope size={26}/>
          {isExpanded && <span className="Link-text">Contact Us</span>}
        </li>
        <li onClick={handleProfileClick}>
          <CgProfile size={26}/>
          {isExpanded && <span className="Link-text">My Space</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
