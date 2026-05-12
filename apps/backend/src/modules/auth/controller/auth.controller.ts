import { type Request, type Response } from "express";
import { AuthService } from "../services/auth.service.ts";
import { success } from "zod";

export class AuthController {
    private authService = new AuthService();

    register = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json({
                success: true,
                message: "User registered successfully.",
                data: {
                    user: user
                }
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    verifyOtp = async (req: Request, res: Response) => {
        try {
            const { email, otp } = req.body;
            const token = await this.authService.verifyOtp(email, otp);
            res.status(200).json({
                success: true,
                message: "OTP verified successfully.",
                data: {
                    token: token
                }
            })
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(
                email,
                password
            );
            res.json({
                success: true,
                message: "User logged in.",
                data: {
                    ...result
                }
            })
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}