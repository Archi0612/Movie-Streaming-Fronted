import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import { loginUserReducer, registerUserReducer } from './reducers/userReducer';
import { paymentReducer } from './reducers/paymentReducer';

// Define the root reducer
const rootReducer = {
    registerUser: registerUserReducer,
    loginUser: loginUserReducer,
    payment: paymentReducer,
};

// Create the store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true,
});

// Define RootState type (helps with useSelector)
export type RootState = ReturnType<typeof store.getState>;

// Define App Dispatch type (helps with useDispatch)
export type AppDispatch = typeof store.dispatch;

// Define a generic Thunk type for async actions
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
