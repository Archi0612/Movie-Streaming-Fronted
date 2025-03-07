import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Home from "../pages/Home";
import WelcomePage from "../pages/WelcomePage";
import Login from "../pages/Authentication/Login/Login";
import Signup from "../pages/Authentication/Signup/Signup";
import ForgotPassword from "../pages/Authentication/Forgot-Password/ForgotPassword";
import ResetPassword from "../pages/Authentication/Reset-Password/ResetPassword";
import ProfilePage from "../pages/profilePage";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import HeaderLayout from "../Layouts/HeaderLayout";
import MainLayout from "../Layouts/MainLayout";
import ContactUs from "../pages/ContactUs";
import Feedback from "../pages/Feedback";
import AddMovie from "../pages/Admin/AddMovie";
import AdminDashboardSeries from "../pages/Admin/AdminDashboardSeries";
import AddSeries from "../pages/Admin/AddSeries";
import HeroSection from "../components/HeroSection";
import PaymentSuccess from "../pages/paymentSuccess/paymentSuccess";
import PaymentCancel from "../pages/paymentCancel/paymentCancel";
import { Bounce, ToastContainer } from "react-toastify";
import GenrePage from "../pages/GenrePage";
import Search from "../pages/Search";
import AddEpisode from "../pages/Admin/AddEpisode";

// Protected Route component that checks if user is authenticated
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

        </Route>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HeroSection />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/admin-dashboard-series" element={<AdminDashboardSeries />} />
          <Route path="/add-series" element={<AddSeries />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCancel />} />


          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/movies" element={<HeroSection/>}/> 
          <Route path="/genres" element={<GenrePage/>}/>
          <Route path="/feedback" element={<Feedback/>}/>
          <Route path="/add-movie" element={<AddMovie/>}/> 
          <Route path="/admin-dashboard-series" element={<AdminDashboardSeries/>}/>
          <Route path="/add-series" element={<AddSeries/>} />
          <Route path="/add-episode" element={<AddEpisode/>}/>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Bounce} />
    </BrowserRouter>
  );
};

export default AppRoute;