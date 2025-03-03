import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import { loginUserReducer, registerUserReducer } from './reducers/userReducer';

// import { paymentReducer } from './reducers/paymentReducer';

// const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('user');
//         return serializedState ? JSON.parse(serializedState) : undefined;
//     } catch (err) {
//         console.error("Failed to load state from localStorage", err);
//         return undefined;
//     }
// };


// // Define the root reducer
// const rootReducer = {
//     registerUser: registerUserReducer,
//     loginUser: loginUserReducer,
//     payment: paymentReducer,
// };

// // Create the store
// export const store = configureStore({
//     reducer: rootReducer,
//     preloadedState: {
//         loginUser: loadState(), // Load user data into loginUser reducer
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // No need to manually add thunk
//     devTools: true,
// });

// store.subscribe(() => {
//     try {
//         const state = store.getState();
//         localStorage.setItem('user', JSON.stringify(state.loginUser));
//     } catch (err) {
//         console.error("Failed to save state to localStorage", err);
//     }
// });

// // Define RootState type (helps with useSelector)
// export type RootState = ReturnType<typeof store.getState>;

// // Define App Dispatch type (helps with useDispatch)
// export type AppDispatch = typeof store.dispatch;

// // Define a generic Thunk type for async actions
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action<string>
// >;
