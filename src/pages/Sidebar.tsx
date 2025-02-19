import { useState, useEffect } from "react";
import { FaHome, FaFilm, FaTv, FaEnvelope } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname); // Set active item based on URL

  useEffect(() => {
    setActiveItem(location.pathname); // Update active item when route changes
  }, [location.pathname]);

  const menuItems = [
    { name: "Home", icon: FaHome, path: "/home" },
    { name: "Movies", icon: FaFilm, path: "/movies" },
    { name: "Series", icon: FaTv, path: "/series" },
    { name: "Genres", icon: BiCategory, path: "/genres" },
    { name: "Contact Us", icon: FaEnvelope, path: "/contact-us" },
    { name: "My Space", icon: CgProfile, path: "/profile-page" },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-logo">
        <img
          src={logo}
          className="logo-1"
          onClick={() => handleItemClick("/home")}
        />
      </div>

      <ul
        className={`sidebar-list ${isExpanded ? "expanded" : ""}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeItem === item.path; // Check if current path is active

          return (
            <li
              key={item.path}
              onClick={() => handleItemClick(item.path)}
              className={isActive ? "active" : ""}
            >
              <IconComponent
                size={26}
                className={isActive ? "active-icon" : ""}
              />
              {isExpanded && (
                <span className={`Link-text ${isActive ? "active-text" : ""}`}>
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
