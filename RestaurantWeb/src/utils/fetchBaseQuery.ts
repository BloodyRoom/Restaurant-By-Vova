import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import APP_ENV from "../env";
import {getToken} from "./tokenUtil";

export const serverBaseQuery = (path: string) => {
    return fetchBaseQuery({
        baseUrl: `${APP_ENV.API_URL}/api/${path}`,
        prepareHeaders: (headers) => {
            const token = getToken();

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    });
}