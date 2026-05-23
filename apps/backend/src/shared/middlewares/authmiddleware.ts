import jwt, { type JwtPayload } from "jsonwebtoken";
import { type NextFunction, type Response, type Request } from "express";
import { UserService } from "../../modules/user/services/user.service.ts";
import { type AuthRequest } from "../interfaces/userInterface.ts";

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userService = new UserService();
    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({
                message: "User unauthorized",
                isSuccess: false,
                data: null
            })
        }
        const token = authHeader.split(" ")[1] || "";
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
        ) as JwtPayload;
        const userId = decoded.id;
        console.log("Decoded JWT:", decoded);
        const user = await userService.getUser(userId);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json(
            {
                message: error instanceof Error ? error.message : "User unauthorized",
                isSuccess: false,
                data: null
            }
        )

    }
}