import { baseApi } from "./baseApi";

export const interviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        scheduleInterview: builder.mutation({
            query: (data) => ({
                url: "/interview/schedule",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Interviews", "CurrentInterviews"]
        }),
        getAllInterviews: builder.query({
            query: () => '/interview',
            providesTags: ["Interviews"]
        }),
        getUpcomingInterviews: builder.query({
            query: () => '/interview/upcoming',
            providesTags: ["CurrentInterviews"]
        }),
        getInterviewDetailsByRoomId: builder.query({
            query: (roomId) => `/interview/details/roomId/${roomId}`
        })
    })
})

export const { useScheduleInterviewMutation, useGetAllInterviewsQuery, useGetUpcomingInterviewsQuery, useGetInterviewDetailsByRoomIdQuery } = interviewApi;