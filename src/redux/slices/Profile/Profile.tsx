import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProfileApiResponse, ProfileState, UserProfile } from "../../../interfaces/movie.interface";
import { api } from "../../../services/api";
import { handleApiError } from "../../../utils/MediaConstants";

// Initial State
const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null,
};

// Fetch Profile Data
export const fetchProfile = createAsyncThunk<UserProfile>(
    "profile/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<ProfileApiResponse>("user/profile", {
                withCredentials: true, // Ensures authentication token is sent
            });
            return response.data.data.user;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
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