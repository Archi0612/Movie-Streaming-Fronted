import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserState, AuthResponse } from '../../../interfaces/movie.interface';

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const storedToken = localStorage.getItem("authToken");
// const currentUser = localStorage.getItem("currentUser");
// const parsedCurrentUser = currentUser ? JSON.parse(currentUser) as User : null;

const initialState: UserState = {
    currentUser: null,
    isAuthenticated: !!storedToken,
    loading: false,
    success: false,
    error: undefined,
};

// Async Thunks
export const registerUser = createAsyncThunk<AuthResponse, Omit<User, "id" | "token">, { rejectValue: string }>(
    "user/register",
    async (user, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
            const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signup`, user, config);

            localStorage.setItem("authToken", response.data.token);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "An error occurred");
        }
    }
);

export const loginUser = createAsyncThunk<AuthResponse, Pick<User, "email" | "password">, { rejectValue: string }>(
    "user/login",
    async (userFormData, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
            console.log(userFormData, "here is the user data")
            const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, userFormData, config);

            localStorage.setItem("currentUser", JSON.stringify(response.data.userData));
            localStorage.setItem("authToken", response.data.token);

            return response.data;

        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "An error occurred");
        }
    }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    return null;
});

// Create Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.success = true;
            state.error = undefined;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.success = false;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
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
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.success = true;
                state.currentUser = action.payload.userData;
                state.error = undefined;
                state.isAuthenticated = true;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null;
            });
    },
});

export default userSlice.reducer;
