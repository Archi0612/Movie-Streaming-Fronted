import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import Footer from "../pages/Footer";
import { fetchUserData } from "../services/apis/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Loader } from "lucide-react";
import Breadcrumb from "../components/BreadCrumbComponent/Breadcrumb";


const MainLayout: React.FC = () => {
  const [user, setUser] = useState<string>("user");
  const isAuthenticated = useSelector((state:RootState) => state.user.isAuthenticated);
  const fetchUser = async () => {
    const res = await fetchUserData();
    setUser(res.role);
    return res;
  };
  useEffect(() => {
    fetchUser();
  });
  if (user === null) {
    return <Loader/>;
  }
  return (
    <div className="main-layout">
      <Sidebar role={user} />
      <div className="main-layout">
        <main className="content1">
          {isAuthenticated && 
          <div className="breadcrumb-container">
            <Breadcrumb/>
          </div>
          }
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
