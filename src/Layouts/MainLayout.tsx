// import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import Footer from "../pages/Footer";
// import Header from "../pages/Header";

const MainLayout: React.FC = () => {
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 769);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <div className="main-layout">
      {/* {isMobile && <Header showOnlyLogo={true} showFullHeader={false} />}  */}
      <Sidebar />
      <main className="content1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
