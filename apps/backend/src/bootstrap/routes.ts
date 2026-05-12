// This is the global routes where every endpoint of all modules registered.
import { type Express } from "express";
import authRoutes from "../modules/auth/routes/auth.routes.ts";
export const registerRoutes = (app: Express) => {
    app.use("/api/v1/auth", authRoutes);
}