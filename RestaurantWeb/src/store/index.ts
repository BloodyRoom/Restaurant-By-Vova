import {configureStore} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {apiAccount} from "../services/apiAccount";
import authReducer from "./authSlice";
import {apiCategory} from "../services/apiCategory";
import {apiProduct} from "../services/apiProduct";
import { apiCart } from "../services/apiCart";
import {apiDelivery} from "../services/apiDelivery";

export const store = configureStore({
    reducer: {
        [apiAccount.reducerPath]: apiAccount.reducer,
        [apiCategory.reducerPath]: apiCategory.reducer,
        [apiProduct.reducerPath]: apiProduct.reducer,
        [apiCart.reducerPath]: apiCart.reducer,
        [apiDelivery.reducerPath]: apiDelivery.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiAccount.middleware, apiCategory.middleware, apiProduct.middleware, apiCart.middleware, apiDelivery.middleware),
});

export type RootState = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;