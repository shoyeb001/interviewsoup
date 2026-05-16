import { type Request, type Response } from "express";
import { type AuthRequest } from "../../../shared/interfaces/userInterface.ts";
export class UserController {
    getUserProfile = async (req: AuthRequest, res: Response) => {
        try {
            const user = req.user;
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
}