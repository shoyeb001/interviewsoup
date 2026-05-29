export type TUpcomingInterview = {
    id: string;
    interviewer_id: string;
    candidate_name: string;
    candidate_email: string;
    company_name: string;
    agenda: string;
    round_no: number;
    room_id: string;
    interview_date: string;
    interview_time: string;
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
    created_at: string;
    updated_at: string;
};

export type TInterviewEvent = {
    bgColor: string,
    end: string,
    id: string,
    resources: TInterviewEvent,
    start: string,
    textColor: string,
    title: string
}
export type TInterviewEvents = TInterviewEvent[];

export type TUpcomingInterviews = TUpcomingInterview[];