// This is the global routes where every endpoint of all modules registered.
import { type Express } from "express";
import authRoutes from "../modules/auth/routes/auth.routes.ts";
import userRoutes from "../modules/user/routes/user.route.ts";
export const registerRoutes = (app: Express) => {
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/user", userRoutes);
}