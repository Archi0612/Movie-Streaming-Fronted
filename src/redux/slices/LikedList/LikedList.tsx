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

            // console.log(response.data.data.likedContent, "This is in LinkedList slice")
            return response.data.data.likedContent; // Extracting liked content array
        } catch (error:unknown) {
            if(error instanceof Error)return rejectWithValue(error.message || "Failed to fetch liked list");
        }
    }
);

// Add/Remove from Liked List
export const toggleLike = createAsyncThunk(
    "likedList/toggleLike",
    async ({ contentId, contentType }: { contentId: string; contentType: string }, { rejectWithValue, dispatch }) => {
        // console.log(contentId, contentType, "likelist slice");
        try {
            const response = await api.post("/liked/toggle-like", { contentId, contentType }, { withCredentials: true });
            // console.log(response, "response at likelist slice");
            dispatch(fetchLikedList());
            return response.data; // Response may contain updated liked list

        } catch (error: unknown) {
            if(error instanceof Error)return rejectWithValue(error.message || "Failed to update liked list");
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
            .addCase(toggleLike.fulfilled, (state, action) => {
                state.data = action.payload.data; // Updating the liked list after toggle
            })
            .addCase(toggleLike.rejected, (state, action) => {
                state.error = action.payload as string || "Unknown error occurred";
            });
    },
});

export default likedListSlice.reducer;


// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { api } from "../../../services/api";
// import { LikedListState, LikedListApiResponse, LikedContentItem } from "../../../interfaces/movie.interface";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Initial State
// const initialState: LikedListState = {
//     data: null,
//     loading: false,
//     error: null,
// };

// // Fetch Liked List API Call
// export const fetchLikedList = createAsyncThunk(
//     "likedList/fetchLikedList",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await api.get<LikedListApiResponse>("/liked/liked-content", {
//                 withCredentials: true,
//             });

//             console.log(response.data.data.likedContent, "This is in LikedList slice");
//             return response.data.data.likedContent; // Extracting liked content array
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch liked list");
//         }
//     }
// );

// // Add/Remove from Liked List
// export const toggleLike = createAsyncThunk(
//     "likedList/toggleLike",
//     async ({ contentId, contentType }: { contentId: string; contentType: string }, { rejectWithValue, dispatch, getState }) => {
//         try {
//             const response = await api.post("/liked/toggle-like", { contentId, contentType }, { withCredentials: true });

//             console.log(response, "response at liked list slice");

//             // Get current state to check if item is already liked
//             const state = getState() as { likedList: LikedListState };
//             const isAlreadyLiked = state.likedList.data?.some(item => item.contentId === contentId);

//             dispatch(fetchLikedList());

//             // Show success toast based on action (like/unlike)
//             if (isAlreadyLiked) {
//                 toast.info("Removed from Likes", { position: "top-right" });
//             } else {
//                 toast.success("Added to Likes!", { position: "top-right" });
//             }

//             return response.data; // Response may contain updated liked list

//         } catch (error: any) {
//             toast.error("Failed to update liked list", { position: "top-right" });
//             return rejectWithValue(error.response?.data?.message || "Failed to update liked list");
//         }
//     }
// );

// const likedListSlice = createSlice({
//     name: "likedList",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchLikedList.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchLikedList.fulfilled, (state, action: PayloadAction<LikedContentItem[]>) => {
//                 state.loading = false;
//                 state.data = action.payload;
//             })
//             .addCase(fetchLikedList.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || "Unknown error occurred";
//             })
//             .addCase(toggleLike.fulfilled, (state, action) => {
//                 state.data = action.payload.data.likedContent; // Updating the liked list after toggle
//             })
//             .addCase(toggleLike.rejected, (state, action) => {
//                 state.error = action.payload as string || "Unknown error occurred";
//             });
//     },
// });

// export default likedListSlice.reducer;
