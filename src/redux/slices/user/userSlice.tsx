import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserState, AuthResponse, UserDetails } from "../../../interfaces/movie.interface";
import API from "../../../services/api";
import { deleteCookie, getCookie } from "../../../utils/constants";
import { useDispatch } from "react-redux";


// const dispatch = useDispatch<AppDispatch>();


const storedToken = getCookie('token');
const user = localStorage.getItem("currentUser");
const parsedUser = user ? JSON.parse(user) as User : null;
const initialState: UserState = {
    currentUser: parsedUser,
    isAuthenticated: !!storedToken,
    loading: false,
    success: false,
    error: undefined,
    detailsLoading: false,
    detailsError: undefined,
    userDetails: undefined
};

export const registerUser = createAsyncThunk<
    AuthResponse, // Expected return type from API
    Omit<User, "id" | "token">, // Input type (User object without id & token)
    { rejectValue: string } // Type for rejected errors
>(
    "user/register",
    async (user, { rejectWithValue }) => {
        try {
            const response = await API.post<AuthResponse>('/auth/signup', user);

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

export const loginUser = createAsyncThunk<
    AuthResponse,
    Pick<User, "email" | "password">,
    { rejectValue: string }
>(
    "user/login",
    async (userFormData, { rejectWithValue }) => {
        try {
            const response = await API.post<AuthResponse>('/auth/login', userFormData);
            // Store user details & authentication token in local storage
            if (response.data.userData) {
                localStorage.setItem("currentUser", JSON.stringify(response.data.data.userData));
            }
            if (response.data.userData.id) {
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


//Api to get detail info of the user
export const fetchUserDetails = createAsyncThunk<
    UserDetails, // The expected return type (detailed user info)
    string | number, // User ID as input parameter
    { rejectValue: string }
>(
    "user/fetchDetails",
    async (userId, { rejectWithValue }) => {
        try {
            const token = getCookie('token');

            // Make API call to get user details
            const response = await API.get<UserDetails>(`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response, "response fo whole user in user details")

            return response.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data?.message || "Failed to fetch user details");
            }
            return rejectWithValue("An unknown error occurred while fetching user details");
        }
    }
);


export const logoutUser = createAsyncThunk("user/logout", async () => {
    // Remove user data from local storage on logout
    try {
        localStorage.removeItem("currentUser");
        deleteCookie('token');
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
        // Manually log in a user (without API call)
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
            localStorage.removeItem("currentUser");
            deleteCookie('token');
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

            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.detailsError = undefined;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<UserDetails>) => {
                state.detailsLoading = false;
                state.userDetails = action.payload;
                // No need to change isAuthenticated here as it's already set by login
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.detailsLoading = false;
                state.detailsError = action.payload;
                // Note: We don't change isAuthenticated on error as the user is still logged in
            })

            // ✅ **Logout User Cases**
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
