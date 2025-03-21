import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaFilm,
  FaTv,
  FaEnvelope,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard, MdMovie, MdTv } from "react-icons/md";
import logo from "../assets/img/Home/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { SidebarProps } from "../interfaces/movie.interface";
import { IconType } from "react-icons";

interface MenuItem {
  name: string;
  icon: IconType;
  path: string;
  isAdminMenu?: boolean; // Optional property
}

const Sidebar: React.FC<SidebarProps> = ({ role = "user" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [showSparksPopup, setShowSparksPopup] = useState(false);
  const [showAdminSubmenu, setShowAdminSubmenu] = useState(false);
  const isAdmin = role === "admin";

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  // Regular user menu items
  const regularMenuItems: MenuItem[] = [
    { name: "Home", icon: FaHome, path: "/home" },
    { name: "Search", icon: FaSearch, path: "/search" },
    { name: "Movies", icon: FaFilm, path: "/movies" },
    { name: "Series", icon: FaTv, path: "/series" },
    { name: "Genres", icon: BiCategory, path: "/genres" },
    { name: "Contact", icon: FaEnvelope, path: "/contact-us" },
    { name: "My Space", icon: CgProfile, path: "/profile-page" },
  ];
  // Admin-specific menu items
  const adminMenuItems: MenuItem[] = [
    { name: "Home", icon: FaHome, path: "/home" },
    {
      name: "Admin",
      icon: MdDashboard,
      path: "/admin-dashboard-movies",
      isAdminMenu: true,
    },
    { name: "Search", icon: FaSearch, path: "/search" },
    { name: "Movies", icon: FaFilm, path: "/movies" },
    { name: "Series", icon: FaTv, path: "/series" },
    { name: "Genres", icon: BiCategory, path: "/genres" },
    { name: "Contact", icon: FaEnvelope, path: "/contact-us" },
    { name: "My Space", icon: CgProfile, path: "/profile-page" },
  ];

  // Admin submenu items
  const adminSubmenuItems: MenuItem[] = [
    { name: "User Dashboard", icon: FaUsers, path: "/user-dashboard" },
    {
      name: "Movies Dashboard",
      icon: MdMovie,
      path: "/admin-dashboard-movies",
    },
    { name: "Series Dashboard", icon: MdTv, path: "/admin-dashboard-series" },
    {name:"Add Crew",icon:FaUsers,path:"/add-crew"}
  ];

  // Select the appropriate menu items based on user role
  const menuItems = isAdmin ? adminMenuItems : regularMenuItems;

  // Bottom navigation items remain the same for both user types
  const bottomNavItems = [
    { name: "Home", icon: FaHome, path: "/home" },
    { name: "Search", icon: FaSearch, path: "/search" },
    {
      name: "Admin",
      icon: MdDashboard,
      path: "/admin-dashboard-movies",
      isAdminMenu: true,
    },
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
                className={`${activeItem === item.path ? "active" : ""} ${
                  item.isAdminMenu ? "admin-menu-item" : ""
                }`}
                onMouseEnter={() => {
                  if (item.isAdminMenu) {
                    setShowAdminSubmenu(true);
                  }
                }}
                onMouseLeave={() => {
                  if (item.isAdminMenu) {
                    // Keep submenu visible when moving from main item to submenu
                    setTimeout(() => {
                      const submenuHovered = document.querySelector(
                        ".admin-submenu:hover"
                      );
                      if (!submenuHovered) {
                        setShowAdminSubmenu(false);
                      }
                    }, 50);
                  }
                }}
              >
                <IconComponent size={20} />
                {isExpanded && <span className="Link-text">{item.name}</span>}

                {/* Show admin submenu when hovering over admin menu item */}
                {item.isAdminMenu && showAdminSubmenu && isExpanded && (
                  <div
                    className="admin-submenu"
                    onMouseEnter={() => setShowAdminSubmenu(true)}
                    onMouseLeave={() => setShowAdminSubmenu(false)}
                  >
                    {adminSubmenuItems.map((subItem) => {
                      const SubIconComponent = subItem.icon;
                      return (
                        <div
                          key={subItem.path}
                          className={`admin-submenu-item ${
                            activeItem === subItem.path ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick(subItem.path);
                          }}
                        >
                          <SubIconComponent size={16} />
                          <span>{subItem.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
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
                  setShowAdminSubmenu(false);
                } else if (item.name === "Admin") {
                  handleItemClick(item.path);
                  setShowAdminSubmenu(!showAdminSubmenu);
                  setShowSparksPopup(false);
                } else {
                  handleItemClick(item.path);
                  setShowSparksPopup(false);
                  setShowAdminSubmenu(false);
                }
              }}
              className={activeItem === item.path ? "active" : ""}
            >
              <IconComponent />
              <span>{item.name}</span>
              {/* Admin submenu for mobile */}
              {item.isAdminMenu && showAdminSubmenu && (
                <div className="admin-submenu-mobile">
                  {adminSubmenuItems.map((subItem) => {
                    const SubIconComponent = subItem.icon;
                    return (
                      <div
                        key={subItem.path}
                        className={`admin-submenu-item ${
                          activeItem === subItem.path ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(subItem.path);
                        }}
                      >
                        <SubIconComponent size={16} />
                        <span>{subItem.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
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
