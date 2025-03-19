import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserState, AuthResponse } from "../../../interfaces/movie.interface";
import { api } from "../../../services/api";
import { deleteCookie, getCookie } from "../../../utils/MediaConstants";
import { persistor } from "../../store";

const storedToken = getCookie('token');
const user = localStorage.getItem("currentUser");

const parsedUser = user && user !== "undefined" ? JSON.parse(user) as User : null;

const initialState: UserState = {
    currentUser: parsedUser,
    isAuthenticated: !!storedToken,
    loading: false,
    success: false,
    error: undefined,
    detailsLoading: false,
    detailsError: undefined,
    userDetails: undefined,
};

export const registerUser = createAsyncThunk<
    AuthResponse,
    { rejectValue: string }
>(
    "user/register",
    async (user, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>('/auth/signup', user);
            return response.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data?.message || "Something went wrong");
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

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
            if (response.data.data.userData) {
                console.log(response.data.data.userData)
                localStorage.setItem("currentUser", JSON.stringify(response.data.data.userData));
            }
            if (response.data.data.userData.id) {
                console.log("ignore this console");
                // dispatch(fetchUserDetails(response.data.userData.id));
            }
            return response.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data?.message || "Something went wrong");
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
    // Remove user data from local storage on logout
    try {
        console.log("logout called")
        const response = await api.post<AuthResponse>('/auth/logout');
        if (response.status === 200) {
            console.log("got status 200");
            localStorage.removeItem("currentUser");
            deleteCookie('token');
            persistor.purge();
        }
        return null;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return (error.response?.data?.message || "Logout Failed");
        }
    }
});

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
            localStorage.removeItem("currentUser");
            deleteCookie('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.success = true;
                state.currentUser = action.payload.data.userData;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.success = true;
                state.currentUser = action.payload.data.userData;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.success = false;
                state.error = undefined;
            })

            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.currentUser = null;
                state.isAuthenticated = false;
            })
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

export type AppDispatch = typeof import("../../store").store.dispatch;