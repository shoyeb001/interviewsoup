import { Router } from "express";

import { InterviewController } from "../controller/interview.controller.ts";

import { authMiddleware } from "../../../shared/middlewares/authmiddleware.ts";

const router = Router();

const interviewController =
    new InterviewController();

router.post(
    "/schedule",
    authMiddleware,
    interviewController.scheduleInterview
);
router.get(
    "/",
    authMiddleware,
    interviewController.getAllInterviews
);

router.get(
    "/upcoming",
    authMiddleware,
    interviewController.getUpcomingInterviews
);

export default router;