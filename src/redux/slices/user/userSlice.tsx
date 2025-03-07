import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserState, AuthResponse } from "../../../interfaces/movie.interface";
import {api} from "../../../services/api";

// Get stored authentication token from local storage
const storedToken = localStorage.getItem("authToken");

// Define initial state for user authentication
const initialState: UserState = {
    currentUser: null, // Stores logged-in user details
    isAuthenticated: !!storedToken, // Check if a token exists for authentication
    loading: false, // Indicates if an api request is in progress
    success: false, // Stores success status of api calls
    error: undefined, // Stores error messages, if any
};

// ✅ **AsyncThunk for Registering a User**
export const registerUser = createAsyncThunk<
    AuthResponse, // Expected return type from api
    Omit<User, "id" | "token">, // Input type (User object without id & token)
    { rejectValue: string } // Type for rejected errors
>(
    "user/register",
    async (user, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>('/auth/signup', user);

            // Store auth token in local storage after successful registration
            // localStorage.setItem("authToken", response.data.token);
            return response.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data?.message || "Something went wrong");
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

// ✅ **AsyncThunk for Logging in a User**
export const loginUser = createAsyncThunk<
    AuthResponse,
    Pick<User, "email" | "password">,
    { rejectValue: string }
>(
    "user/login",
    async (userFormData, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>('/auth/login', userFormData);

            // Store user details & authentication token in local storage
            localStorage.setItem("currentUser", JSON.stringify(response.data.userData));
            localStorage.setItem("authToken", response.data.token);

            return response.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data?.message || "Something went wrong");
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

// ✅ **AsyncThunk for Logging out a User**
export const logoutUser = createAsyncThunk("user/logout", async () => {
    // Remove user data from local storage on logout
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    return null;
});

// ✅ **Create the Redux Slice for User Authentication**
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Manually log in a user (without api call)
        login: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.success = true;
            state.error = undefined;
        },

        // Manually log out a user
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.success = false;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ **Register User Cases**
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.success = true;
                state.currentUser = action.payload.userData;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ **Login User Cases**
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.success = true;
                state.currentUser = action.payload.userData;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ **Logout User Cases**
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null;
                state.isAuthenticated = false;
            });
    },
});

// ✅ **Export Actions & Reducer**
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

// ✅ **AppDispatch Type (Fix for TypeScript Dispatch Error)**
export type AppDispatch = typeof import("../../store").store.dispatch;
