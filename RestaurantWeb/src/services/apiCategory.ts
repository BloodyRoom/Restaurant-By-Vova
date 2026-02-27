import {createApi} from "@reduxjs/toolkit/query/react";
import type {ICategory} from "../types/category/ICategory";
import {serverBaseQuery} from "../utils/fetchBaseQuery";
import type {ICategoryCreate} from "../types/category/ICategoryCreate";
import type {ICategoryUpdate} from "../types/category/ICategoryUpdate";
import {serialize} from "object-to-formdata";
import {getUserInfo} from "../utils/tokenUtil";


export const apiCategory = createApi({
    reducerPath: 'apiCategory',
    baseQuery: serverBaseQuery("categories"),
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[],void>({
            query: () => ({
                url: "get",
                method: "GET"
            }),
            providesTags: ['Categories'],
        }),
        categoryCreate: builder.mutation<ICategory | null, ICategoryCreate>({
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
                }
                catch {
                    throw new Error("Помилка перетворення даних")
                }
            },
            invalidatesTags: ["Categories"]
        }),
        categoryUpdate: builder.mutation<ICategory | null, ICategoryUpdate>({
            query: (model) => {
                try {
                    const user = getUserInfo();
                    if (user == null || !user.roles.includes("Admin")) throw new Error("Forbidden");

                    const formData = serialize(model);
                    return {
                        method: "PATCH",
                        url: "update",
                        body: formData
                    }
                }
                catch {
                    throw new Error("Помилка перетворення даних")
                }
            },
            invalidatesTags: ["Categories"]
        }),
        categoryDelete: builder.mutation<boolean, number>({
            query: (id) => {
                const user = getUserInfo();
                if (user == null || !user.roles.includes("Admin")) throw new Error("Forbidden");

                return {
                    url: `delete`,
                    method: "DELETE",
                    body: {id: id}
                }
            },
            invalidatesTags: ['Categories'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCategoryCreateMutation,
    useCategoryDeleteMutation,
    useCategoryUpdateMutation,
} = apiCategory;