import { Router } from "express";
import { AuthController } from "../controller/auth.controller.ts";
const router = Router();

const authController = new AuthController();

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.login);
router.post("/resend-otp", authController.resendOtp);

export default router;