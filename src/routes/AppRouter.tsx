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
import UserDashboard from "../pages/Admin/UserDashboard";
import AddSeries from "../pages/Admin/AddSeries";
import HeroSection from "../components/HeroSection";

import PaymentCancel from "../pages/paymentCancel/paymentCancel";
import { Bounce, ToastContainer } from "react-toastify";
import GenrePage from "../pages/GenrePage";
import Search from "../pages/Search";
import AddEpisode from "../pages/Admin/AddEpisode";
import GenreDetail from "../pages/GenreDetail";

import DetailsPage from "../pages/DetailsPage";
import SeriesPage from "../pages/SeriesPage";
import { PaymentSuccess } from "../pages/paymentSuccess/paymentSuccess";





// Protected Route component that checks if user is authenticated
const ProtectedRoute: React.FC = () => {
  
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated, save the intended location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the child routes
  return <Outlet />;
};

// AdminRoute component that checks if user is admin
const AdminRoute: React.FC = () => {
  const { isAuthenticated, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  // console.log("CurrentUser", currentUser, "and role", currentUser?.role, isAuthenticated);

  if (!isAuthenticated || currentUser?.role !== "admin") {
    // Redirect to home if not admin
    return <Navigate to="/home" replace />;
  }
  // Render the child routes
  return <Outlet />;
};

// Public Route component to redirect authenticated users away from auth pages
const PublicOnlyRoute: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (isAuthenticated) {
    // Redirect to home if already authenticated
    return <Navigate to="/home" replace />;
  }

  // Render the child routes
  return <Outlet />;
};

const AppRoute: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (Welcome) - accessible to all */}
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<WelcomePage />} />
          {/* Auth routes - only accessible when NOT logged in */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        {/* Protected Routes - requires authentication */}
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            {/* User Routes */}
            <Route path="/home" element={<HeroSection />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movies" element={<Home />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/genres" element={<GenrePage />} />
            <Route path="/genres/:genreId" element={<GenreDetail/>}/>
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancel" element={<PaymentCancel />} />
            <Route path="/details" element={<DetailsPage />}/>
      
          </Route>

          {/* Admin Routes - requires admin role */}
          <Route element={<AdminRoute />}>
            <Route path="/admin-dashboard-movies" element={<AdminDashboard />} />
            <Route
              path="/admin-dashboard-series"
              element={<AdminDashboardSeries />}
            />
            <Route path="/add-movies" element={<AddMovie />} />
            <Route path="/add-series" element={<AddSeries />} />
            <Route path="/add-episode" element={<AddEpisode />} />
            <Route path="/user-dashboard" element={<UserDashboard/>}/>
          </Route>
        </Route>

        {/* Catch all route - redirect to appropriate landing page */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </BrowserRouter>
  );
};

export default AppRoute;