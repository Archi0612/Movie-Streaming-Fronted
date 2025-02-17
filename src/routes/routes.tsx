import Signup from '../pages/Authentication/Signup/Signup'
import Login from '../pages/Authentication/Login/Login'
import ForgotPassword from '../pages/Authentication/Forgot-Password/ForgotPassword'
import ResetPassword from '../pages/Authentication/Reset-Password/ResetPassword'
import Home from '../pages/Home';
import { RouteConfig } from '../types/types';
import ProfilePage from '../pages/profilePage';

const routes: RouteConfig[] = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/profile-page", element: <ProfilePage /> },


]

export default routes;