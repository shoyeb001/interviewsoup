import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
             query:()=> '/user/profile'
        })
    })
})

export const {useGetUserProfileQuery} = userApi;