import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import profileReducer from './slices/Profile/Profile';
import watchlistReducer from "./slices/WatchList/WatchList";
import likedlistReducer from "./slices/LikedList/LikedList";


export const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        watchlist: watchlistReducer,
        likedlist: likedlistReducer
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
