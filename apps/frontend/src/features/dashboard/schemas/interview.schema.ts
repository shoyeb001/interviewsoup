import { z } from "zod";

const addInterviewSchema = z.object({
    candidateName: z.string().min(1, "Please enter candidate name"),
    candidateEmail: z.string().min(1, "Please enter candidate email"),
    companyName: z.string().min(1, "Enter company name"),
    interviewDate: z.string().min(1, "Please enter date"),
    interviewTime: z.string().min(1, "Please enter interview time"),
    roundNo: z.string().min(1, "Please enter interview round"),
    agenda: z.string().min(1, "Please enter agenda")
});

export type AddInterviewSchemaType = z.infer<typeof addInterviewSchema>

export default addInterviewSchema;