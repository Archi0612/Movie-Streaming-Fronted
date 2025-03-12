import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import Footer from "../pages/Footer";

import { fetchUserData } from "../services/apis/userApi";

const MainLayout: React.FC = () => {
  const [user, setUser] = useState<string>("user");
  const fetchUser = async () => {
    const res = await fetchUserData();
    setUser(res.role);
    return res;
  };
  useEffect(() => {
    fetchUser();
  });
  if (user === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main-layout">
      <Sidebar userRole={user} />
      <div className="main-layout">
        <main className="content1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
