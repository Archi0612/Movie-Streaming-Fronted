import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import { UserState } from "../interfaces/movie.interface";

// Retrieve token from localStorage
const storedToken = localStorage.getItem("authToken");

// Preloaded state for authentication persistence
const preloadedState = {
    user: {
        currentUser: null,
        isAuthenticated: !!storedToken,
        loading: false,
        success: false,
        error: undefined,
    } as UserState,
};

// Configure Redux store
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState,
    devTools: true, // Enable Redux DevTools
});

// Export types for Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
