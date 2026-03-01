import {createApi} from "@reduxjs/toolkit/query/react";
import {serverBaseQuery} from "../utils/fetchBaseQuery";
import {IDelivery} from "../types/delivery/IDelivery";
import {IDeliveryCreate} from "../types/delivery/IDeliveryCreate";
import {IDeliveryUpdate} from "../types/delivery/IDeliveryUpdate";
import {IDeliveryWithUser} from "../types/delivery/IDeliveryWithUser";
import {getUserInfo} from "../utils/tokenUtil";

export const apiDelivery = createApi({
    reducerPath: "apiDelivery",
    baseQuery: serverBaseQuery("Delivery"),
    tagTypes: ['Deliveries'],
    endpoints: (builder) => ({
        getDeliveries: builder.query<IDelivery[], void>({
            query: () => ({
                url: "get",
                method: "GET"
            }),
            providesTags: ['Deliveries']
        }),
        getAllDeliveries: builder.query<IDeliveryWithUser[], void>({
            query: () => ({
                url: "getAll",
                method: "GET"
            }),
            providesTags: ['Deliveries']
        }),
        deliveryCreate: builder.mutation<IDelivery | null, IDeliveryCreate>({
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
            invalidatesTags: ["Deliveries"]
        }),
        deliveryUpdate: builder.mutation<IDelivery | null, IDeliveryUpdate>({
            query: (model) => {
                const user = getUserInfo();
                if (user == null || !user.roles.includes("Admin")) throw new Error("Forbidden");

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
            invalidatesTags: ["Deliveries"]
        }),
        deliveryDelete: builder.mutation<boolean, number>({
            query: (id) => {
                const user = getUserInfo();
                if (user == null || !user.roles.includes("Admin")) throw new Error("Forbidden");

                return {
                    url: `delete`,
                    method: "DELETE",
                    body: {id: id}
                }
            },
            invalidatesTags: ["Deliveries"]
        }),
    })
})

export const {
    useGetDeliveriesQuery,
    useGetAllDeliveriesQuery,
    useDeliveryCreateMutation,
    useDeliveryUpdateMutation,
    useDeliveryDeleteMutation
} = apiDelivery;