import { type Request, type Response } from "express";
import { InterviewService } from "../services/interview.service.ts";
import type { AuthRequest } from "../../../shared/interfaces/userInterface.ts";
import { scheduleInterviewBodySchema } from "../validation/interview.validation.ts";
import type { TInterview } from "../types/interviewTypes.ts";

export class InterviewController {
    private interviewService = new InterviewService();

    scheduleInterview = async (req: AuthRequest, res: Response) => {
        try {
            const validatedData = scheduleInterviewBodySchema.parse(
                req.body
            );
            const user = req.user;
            console.log("User ID===>", user);
            const interviewData: TInterview = {

                interviewerId:
                    user?.id || "",
                candidateName:
                    validatedData.candidateName,
                candidateEmail:
                    validatedData.candidateEmail,
                companyName:
                    validatedData.companyName,
                agenda:
                    validatedData.agenda,
                roundNo:
                    validatedData.roundNo,
                interviewDate:
                    validatedData.interviewDate,
                interviewTime:
                    validatedData.interviewTime,
            };
            const interview =
                await this.interviewService.scheduleInterview(
                    interviewData
                );
            res.status(201).json({
                success: true,
                message: "Interview scheduled successfully",
                data: {
                    interview: interview
                }
            })
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || "something went wrong"
            })
        }
    }
}