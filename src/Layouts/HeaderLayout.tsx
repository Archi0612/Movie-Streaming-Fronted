import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/Header";
// import Footer from "../pages/Footer";

const HeaderLayout: React.FC = () => {
  const location = useLocation();

  // Define paths where only the logo should be shown
  const authPages = ["/login", "/signup", "/forgot-password", "/reset-password"];

  return (
    <>
      
      <Header showFullHeader={location.pathname === "/"} showOnlyLogo={authPages.includes(location.pathname)} />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

export default HeaderLayout;
