import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../../services/api";
import { LikedListState, LikedListApiResponse, LikedContentItem } from "../../../interfaces/movie.interface"

// Initial State
const initialState: LikedListState = {
    data: null,
    loading: false,
    error: null,
};

// Fetch Liked List API Call
export const fetchLikedList = createAsyncThunk(
    "likedList/fetchLikedList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<LikedListApiResponse>("/liked/liked-content", {
                withCredentials: true,
            });

            console.log(response.data.data.likedContent, "This is in LinkedList slice")
            return response.data.data.likedContent; // Extracting liked content array
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch liked list");
        }
    }
);

// Add/Remove from Liked List
export const removeLike = createAsyncThunk(
    "likedList/toggleLike",
    async (contentId: string, { rejectWithValue }) => {
        try {
            const response = await api.post("/liked/toggle-like", { contentId }, { withCredentials: true });
            console.log(response, "response at likelist slice")
            return response.data; // Response may contain updated liked list

        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update liked list");
        }
    }
);

const likedListSlice = createSlice({
    name: "likedList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLikedList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLikedList.fulfilled, (state, action: PayloadAction<LikedContentItem[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLikedList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Unknown error occurred";
            })
            .addCase(removeLike.fulfilled, (state, action) => {
                state.data = action.payload.data.likedContent; // Updating the liked list after toggle
            })
            .addCase(removeLike.rejected, (state, action) => {
                state.error = action.payload as string || "Unknown error occurred";
            });
    },
});

export default likedListSlice.reducer;