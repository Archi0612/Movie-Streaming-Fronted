import { useState } from "react";
import { FaHome, FaFilm, FaTv, FaEnvelope } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/Logo (1).png"
import logo1 from "../assets/logoF (1).png"
import "./Sidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-logo">
        {!isExpanded ?(
        <img src={logo1} alt=""  className="logo1"/>):(<img src={logo1} className="logo2"/>)}
      </div>
      <ul>
        <li>
          <FaHome size={24}/>
          {isExpanded && <span className="Link-text">Home</span>}
        </li>
        <li>
          <FaFilm size={24}/>
          {isExpanded && <span className="Link-text">Movies</span>}
        </li>
        <li>
          <FaTv size={24} />
          {isExpanded && <span className="Link-text">Series</span>}
        </li>
        <li>
          <BiCategory size={24} />
          {isExpanded && <span className="Link-text">Genres</span>}
        </li>
        <li>
          <FaEnvelope size={24}/>
          {isExpanded && <span className="Link-text">Contact Us</span>}
        </li>
        <li>
          <CgProfile size={24}/>
          {isExpanded && <span className="Link-text">My Space</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
