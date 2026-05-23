import { baseApi } from "./baseApi";

export const interviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        scheduleInterview: builder.mutation({
            query: (data) => ({
                url: "/interview/schedule",
                method: "POST",
                body: data
            })
        })
    })
})

export const { useScheduleInterviewMutation } = interviewApi;