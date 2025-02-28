import axios from "axios";
import { Dispatch } from "redux";
import { LoginDetails } from "../../interfaces/movie.interface";
import { UserFormData } from "../../interfaces/movie.interface";


// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Action Types
const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';
const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
const USER_LOGOUT = 'USER_LOGOUT';

// Register User Action
export const registerUser = (user: UserFormData) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });

    try {
        // Extract only the required fields for API request
        const userData = {
            email: user.email,
            contactNo: user.phoneNumber, // Ensure `phoneNumber` is not undefined
            name: user.name,
            password: user.password,
            otp: user.numberOTP, // Ensure `numberOTP` is a number
        };

        // Debugging log
        console.log("Sending user data to backend:", userData);

        // Ensure no field is undefined
        if (Object.values(userData).some(value => value === undefined)) {
            throw new Error("Some required fields are missing.");
        }

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        // API request
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData, config);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });

        localStorage.setItem("authToken", response.data.token || ""); // Avoid storing undefined

        console.log("Registration successful:", response.data);
    } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || "An error occurred";
        dispatch({ type: USER_REGISTER_FAILED, payload: errorMessage });
        console.error("Registration error:", errorMessage);
    }
};


// Login User Action
export const loginUser = (user: LoginDetails) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });

    try {
        const userData = {
            email: user.email,
            password: user.password,
        };
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, config);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
        console.log(response, "this is the response that we got from api response")
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        localStorage.setItem("authToken", response.data.token); // If token exists

        console.log("Login successful:", response.data);
    } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.response?.data || "An error occurred";
        dispatch({ type: USER_LOGIN_FAILED, payload: errorMessage });
        console.error("Login error:", errorMessage);
    }
};

// Logout User Action
export const logoutUser = () => (dispatch: Dispatch) => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");

    dispatch({ type: USER_LOGOUT });

    // Redirect user if needed (React Router alternative)
    window.location.href = "/login";
};
