import { Router } from "express";
import { UserController } from "../controller/user.controller.ts";
import { authMiddleware } from "../../../shared/middlewares/authmiddleware.ts";
const router = Router();

const userController = new UserController();

router.get("/profile", authMiddleware, userController.getUserProfile);

export default router;