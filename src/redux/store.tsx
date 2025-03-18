import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore, REHYDRATE } from "redux-persist";
import userReducer from "./slices/user/userSlice";
import profileReducer from './slices/Profile/Profile';
import watchlistReducer from "./slices/WatchList/WatchList";
import likedlistReducer from "./slices/LikedList/LikedList";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "watchlist", "likedlist"],
}

const rootReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    watchlist: watchlistReducer,
    likedlist: likedlistReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
