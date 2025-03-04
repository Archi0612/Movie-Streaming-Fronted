import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import { UserState } from "../interfaces/movie.interface";

// const storedUser = localStorage.getItem("currentUser");
const storedToken = localStorage.getItem("authToken");

const preloadedState = {
    user: {
        currentUser: null,
        isAuthenticated: !!storedToken,
        loading: false,
        success: false,
        error: undefined,
    } as UserState,
};

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState, // <-- Load from localStorage
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
