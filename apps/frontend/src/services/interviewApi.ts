import { baseApi } from "./baseApi";

export const interviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        scheduleInterview: builder.mutation({
            query: (data) => ({
                url: "/interview/schedule",
                method: "POST",
                body: data
            })
        }),
        getAllInterviews: builder.query({
            query: () => '/interview',
            providesTags: ["Interviews"]
        }),
        getUpcomingInterviews: builder.query({
            query: () => '/interview/upcoming',
            providesTags: ["CurrentInterviews"]
        }),
    })
})

export const { useScheduleInterviewMutation, useGetAllInterviewsQuery, useGetUpcomingInterviewsQuery } = interviewApi;