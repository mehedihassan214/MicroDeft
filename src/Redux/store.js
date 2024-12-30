// store.js
import { configureStore } from "@reduxjs/toolkit";
import { courseApi } from "./apiSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        [courseApi.reducerPath]: courseApi.reducer,
        authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(courseApi.middleware),
});

export default store;