import { useState } from "react";
import { FaHome, FaFilm, FaTv, FaEnvelope } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import "./Sidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul className={`sidebar-list ${isExpanded? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}>
        <li>
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
        <li>
          <CgProfile size={26}/>
          {isExpanded && <span className="Link-text">My Space</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
