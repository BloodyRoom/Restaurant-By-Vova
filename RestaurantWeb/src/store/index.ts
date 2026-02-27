import {configureStore} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {apiAccount} from "../services/apiAccount";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        [apiAccount.reducerPath]: apiAccount.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiAccount.middleware)
});

export type RootState = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;