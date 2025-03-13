import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProfileApiResponse, ProfileState, UserProfile } from "../../../interfaces/movie.interface";
import { api } from "../../../services/api";

// Initial State
const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null,
};

// Fetch Profile Data
export const fetchProfile = createAsyncThunk<UserProfile>(
    "profile/fetchProfile",
    async () => {
        try {
            const response = await api.get<ProfileApiResponse>("user/profile", {
                withCredentials: true, // Ensures authentication token is sent
            });
            return response.data.data.user;
        } catch (error: any) {
            return (error.response?.data || "Failed to fetch profile info");
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Unknown error occurred";
            });
    },
});

export default profileSlice.reducer;