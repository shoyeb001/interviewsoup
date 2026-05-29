import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1",
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: [
        "Interviews",
        "CurrentInterviews"
    ],
    endpoints: () => ({}),
});

