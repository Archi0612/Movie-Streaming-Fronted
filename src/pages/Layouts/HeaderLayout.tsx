import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";

const HeaderLayout: React.FC = () => {
  const location = useLocation();

  // Define paths where only the logo should be shown
  const authPages = ["/login", "/signup", "/forgot-password", "/reset-password"];

  return (
    <>
      
      <Header showFullHeader={location.pathname === "/"} showOnlyLogo={authPages.includes(location.pathname)} />
      <Outlet />
    </>
  );
};

export default HeaderLayout;
