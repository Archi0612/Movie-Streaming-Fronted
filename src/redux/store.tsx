import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";


// Configure Redux store
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    devTools: true, // Enable Redux DevTools
});

// Export types for Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
