import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

//This is Main API configuration (Axios instance)
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials:true
});

export default api;