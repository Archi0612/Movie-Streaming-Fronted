import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import WelcomePage from "../pages/WelcomePage";
import Login from "../pages/Authentication/Login/Login";
import Signup from "../pages/Authentication/Signup/Signup";
import ForgotPassword from "../pages/Authentication/Forgot-Password/ForgotPassword";
import ResetPassword from "../pages/Authentication/Reset-Password/ResetPassword";
import ProfilePage from "../pages/profilePage";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import HeaderLayout from "../pages/Layouts/HeaderLayout";
import MainLayout from "../pages/Layouts/MainLayout";
import OtpCode from "../pages/Authentication/Otp/OtpCode";
import ContactUs from "../pages/ContactUs";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otp" element={<OtpCode/>}/>
          
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
