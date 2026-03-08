import {createApi} from "@reduxjs/toolkit/query/react";
import {serverBaseQuery} from "../utils/fetchBaseQuery";
import {type ICart} from "../types/cart/ICart";
import {type ICartCreate} from "../types/cart/ICartCreate";
import {type ICartUpdate} from "../types/cart/ICartUpdate";

export const apiCart = createApi({
    reducerPath: "apiCart",
    baseQuery: serverBaseQuery("carts"),
    tagTypes: ['Carts'],
    endpoints: (builder) => ({
        getCarts: builder.query<ICart[], void>({
            query: () => ({
                url: "get",
                method: "GET"
            }),
            providesTags: ['Carts']
        }),
        cartCreate: builder.mutation<ICart | null, ICartCreate>({
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
        cartUpdate: builder.mutation<ICart | null, ICartUpdate>({
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
        cartDelete: builder.mutation<boolean, number>({
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
    useGetCartsQuery,
    useCartCreateMutation,
    useCartUpdateMutation,
    useCartDeleteMutation
} = apiCart;