import {createApi} from "@reduxjs/toolkit/query/react";
import {serverBaseQuery} from "../utils/fetchBaseQuery";
import {ICart} from "../types/cart/ICart";
import {ICartCreate} from "../types/cart/ICartCreate";
import {serialize} from "object-to-formdata";
import {ICartUpdate} from "../types/cart/ICartUpdate";

export const apiCart = createApi({
    reducerPath: "apiCart",
    baseQuery: serverBaseQuery("carts"),
    tagTypes: ['Carts'],
    endpoints: (builder) => ({
        getProducts: builder.query<ICart[], void>({
            query: () => ({
                url: "get",
                method: "GET"
            }),
            providesTags: ['Carts']
        }),
        productCreate: builder.mutation<ICart | null, ICartCreate>({
            query: (model) => {
                try {
                    return {
                        method: "POST",
                        url: "create",
                        body: model
                    };
                } catch {
                    throw new Error("Помилка перетворення даних")
                }
            },
            invalidatesTags: ["Carts"]
        }),
        productUpdate: builder.mutation<ICart | null, ICartUpdate>({
            query: (model) => {
                try {
                    return {
                        method: "PATCH",
                        url: "update",
                        body: model
                    };
                } catch {
                    throw new Error("Помилка перетворення даних")
                }
            },
            invalidatesTags: ["Carts"]
        }),
        productDelete: builder.mutation<boolean, number>({
            query: (id) => {
                return {
                    url: `delete`,
                    method: "DELETE",
                    body: {id: id}
                }
            },
            invalidatesTags: ["Carts"]
        }),
    })
})

export const {
    useGetProductsQuery,
    useProductCreateMutation,
} = apiCart;