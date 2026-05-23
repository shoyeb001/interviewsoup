import z from "zod";

export const scheduleInterviewBodySchema = z.object({

    candidateName: z
        .string()
        .min(2),

    candidateEmail: z
        .string()
        .email(),

    companyName: z
        .string()
        .min(2),

    agenda: z
        .string()
        .min(5),

    roundNo: z
        .number()
        .min(1),

    interviewDate: z
        .string(),

    interviewTime: z
        .string(),
})