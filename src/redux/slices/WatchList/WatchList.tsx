import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../../services/api";
import { WatchListApiResponse, WatchListState, WatchListItem } from "../../../interfaces/movie.interface";
import { handleApiError } from "../../../utils/MediaConstants";

// Initial State
const initialState: WatchListState = {
    data: null,
    loading: false,
    error: null,
};

// Fetch Watchlist
export const fetchWatchList = createAsyncThunk(
    "watchlist/fetchWatchList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<WatchListApiResponse>("watchlist", {
                withCredentials: true,
            });
            return response.data.data.watchlist.watchlist;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Toggle Watchlist (Add/Remove Movie)
export const toggleWatchList = createAsyncThunk(
    "watchlist/toggleWatchList",
    async ({ contentId, contentType }: { contentId: string; contentType: string }, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.post("watchlist/toggle", { contentId, contentType }, {
                withCredentials: true,

            });

            dispatch(fetchWatchList());
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

const watchListSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWatchList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWatchList.fulfilled, (state, action: PayloadAction<WatchListItem[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWatchList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Unknown error occurred";
            })
            .addCase(toggleWatchList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleWatchList.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(toggleWatchList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Unknown error occurred";
            });
    },
});

export default watchListSlice.reducer;
export type AppDispatch = typeof import("../../store").store.dispatch;