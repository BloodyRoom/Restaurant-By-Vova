import {createApi} from "@reduxjs/toolkit/query/react";
import {serverBaseQuery} from "../utils/fetchBaseQuery";
import {IProduct} from "../types/product/IProduct";
import {IProductCreate} from "../types/product/IProductCreate";
import {getUserInfo} from "../utils/tokenUtil";
import {serialize} from "object-to-formdata";
import {IProductUpdate} from "../types/product/IProductUpdate";

export const apiProduct = createApi({
    reducerPath: "apiProduct",
    baseQuery: serverBaseQuery("products"),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: "get",
                method: "GET"
            }),
            providesTags: ['Products']
        }),
        productCreate: builder.mutation<IProduct | null, IProductCreate>({
            query: (model) => {
                try {
                    const user = getUserInfo();
                    if (user == null || !user.roles.includes("Admin")) throw new Error("Forbidden");

                    const formData = serialize(model);
                    return {
                        method: "POST",
                        url: "create",
                        body: formData
                    };
                } catch {
                    throw new Error("Помилка перетворення даних")
                }
            },
            invalidatesTags: ["Products"]
        }),
        productUpdate: builder.mutation<IProduct | null, IProductUpdate>({
            query: (model) => {
                try {
                    const user = getUserInfo();
                    if (user == null || !user.roles.includes("Admin")) throw new Error("Forbidden");

                    const formData = serialize(model);
                    return {
                        method: "PATCH",
                        url: "update",
                        body: formData
                    };
                } catch {
                    throw new Error("Помилка перетворення даних")
                }
            },
            invalidatesTags: ["Products"]
        }),
        productDelete: builder.mutation<boolean, number>({
            query: (id) => {
                const user = getUserInfo();
                if (user == null || !user.roles.includes("Admin")) throw new Error("Forbidden");

                return {
                    url: `delete`,
                    method: "DELETE",
                    body: {id: id}
                }
            },
            invalidatesTags: ["Products"]
        }),
    })
})

export const {
    useGetProductsQuery,
    useProductCreateMutation,
} = apiProduct;