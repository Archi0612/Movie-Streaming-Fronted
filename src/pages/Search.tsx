import { useState, useEffect } from "react";
import { FaHome, FaFilm, FaTv, FaEnvelope, FaSearch, FaPlus } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  userRole?: string; // Optional prop to determine if user is admin
}

const Sidebar: React.FC<SidebarProps> = ({ userRole = "user" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [showSparksPopup, setShowSparksPopup] = useState(false);
  const isAdmin = userRole === "admin";

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  // Regular user menu items
  const regularMenuItems = [
    { name: "Home", icon: FaHome, path: "/home" },
    { name: "Search", icon: FaSearch, path: "/search" },
    { name: "Movies", icon: FaFilm, path: "/movies" },
    { name: "Series", icon: FaTv, path: "/series" },
    { name: "Genres", icon: BiCategory, path: "/genres" },
    { name: "Contact", icon: FaEnvelope, path: "/contact-us" },
    { name: "My Space", icon: CgProfile, path: "/profile-page" },
  ];

  // Admin-specific menu items
  const adminMenuItems = [
    { name: "Home", icon: FaHome, path: "/home" },
    { name: "Dashboard", icon: MdDashboard, path: "/admin-dashboard" },
    { name: "Add Movies", icon: FaPlus, path: "/add-movies" },
    { name: "Add Series", icon: FaPlus, path: "/add-series" },
    { name: "Movies", icon: FaFilm, path: "/movies" },
    { name: "Series", icon: FaTv, path: "/series" },
    { name: "Genres", icon: BiCategory, path: "/genres" },
    { name: "Contact", icon: FaEnvelope, path: "/contact-us" },
    { name: "My Space", icon: CgProfile, path: "/profile-page" },
  ];

  // Select the appropriate menu items based on user role
  const menuItems = isAdmin ? adminMenuItems : regularMenuItems;

  // Bottom navigation items remain the same for both user types
  const bottomNavItems = [
    { name: "Home", icon: FaHome, path: "/home" },
    { name: "Search", icon: FaSearch, path: "/search" },
    // { name: "Sparks", icon: FaTv, path: "/series" }, // Triggers Popup
    { name: "My Space", icon: CgProfile, path: "/profile-page" },
  ];

  const sparksOptions = [
    { name: "Movies", icon: FaFilm, path: "/movies" },
    { name: "Series", icon: FaTv, path: "/series" },
    { name: "Genres", icon: BiCategory, path: "/genres" },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* Sidebar for Desktop */}
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
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          />
        </div>

        <ul
          className={`sidebar-list ${isExpanded ? "expanded" : ""}`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li
                key={item.path}
                onClick={() => handleItemClick(item.path)}
                className={activeItem === item.path ? "active" : ""}
              >
                <IconComponent size={20} />
                {isExpanded && <span className="Link-text">{item.name}</span>}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Navigation for Mobile */}
      <ul className="bottom-nav">
        {bottomNavItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <li
              key={item.path}
              onClick={() => {
                if (item.name === "Home") {
                  handleItemClick(item.path);
                  setShowSparksPopup(!showSparksPopup);
                } else {
                  handleItemClick(item.path);
                  setShowSparksPopup(false);
                }
              }}
              className={activeItem === item.path ? "active" : ""}
            >
              <IconComponent />
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>

      {/* Sparks Popup for Mobile */}
      {showSparksPopup && (
        <div className="sparks-popup">
          {sparksOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.path}
                className="sparks-option"
                onClick={() => {
                  handleItemClick(option.path);
                  setShowSparksPopup(true);
                }}
              >
                <IconComponent />
                <span>{option.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Sidebar;