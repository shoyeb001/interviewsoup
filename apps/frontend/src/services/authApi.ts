import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),

        verifyOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/verify-otp",
                method: "POST",
                body: data,
            }),
        }),

        resendOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/resend-otp",
                method: "POST",
                body: data
            }),
        }),

    })
})

export const { useRegisterMutation, useLoginMutation, useVerifyOtpMutation, useResendOtpMutation } = authApi;