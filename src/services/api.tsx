import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

//This is Main API configuration (Axios instance)
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});
export const apiFormData = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    },
    withCredentials: true
});
