import API from "../api";
import axios from "axios";
// const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const login = async (email: string, password: string) => {
    try {
        //axios always convert data into json format
        const result = await API.post("/auth/login", { email, password });
        console.log("login data:", result);
        return result;

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            // If it's an Axios error, check for response data
            throw new Error(err.response?.data?.message || "Something went wrong");
        } else {
            // Generic error handling
            throw new Error("An unknown error occurred");
        }
    }
}

export const generateOTP = async (userData: {
    name: string;
    email: string;
    contactNo: string;
    password: string;
}) => {
    try {
        console.log(userData);
        const result = await API.post("/auth/generateOTP", {
            email: userData.email,
            contactNo: userData.contactNo,
            name: userData.name,
            password: userData.password
        });
        console.log("send otp data:", result);
        return result;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            // If it's an Axios error, check for response data
            throw new Error(err.response?.data?.message || "Something went wrong");
        } else {
            // Generic error handling
            throw new Error("An unknown error occurred");
        }
    }
}
export const signup = async (userData: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    numberOTP: number;
}) => {
    try {
        console.log("1", userData);
        const result = await API.post("auth/signup", {
            email: userData.email,
            contactNo: userData.phoneNumber,
            name: userData.name,
            password: userData.password,
            otp: userData.numberOTP
        });
        console.log("Sign up result:", result);
        return result;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            // If it's an Axios error, check for response data
            throw new Error(err.response?.data?.message || "Something went wrong");
        } else {
            // Generic error handling 
            throw new Error("An unknown error occurred");
        }
    }
}

export const sendMailResetPassword = async (email: string) => {
    try {
        const result = await API.post("auth/sendMailResetPassword", {
            email: email,
            // password: userData.password
        });
        console.log("Forgot password result:", result.data.message);
        return result;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message || "Something went wrong");
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export const resetPassword = async (password: string, token: string) => {
    try {
        const result = await API.post("auth/resetPassword", {
            password: password,
            token: token
        });
        console.log("Forgot password result:", result.data.message);
        return result;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message || "Something went wrong");
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}