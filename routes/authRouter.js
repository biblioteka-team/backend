import express from "express";
import authController from "../controllers/authController.js";
import { registerValidation } from "../middlewares/registerPayload.js";
import authGuard from "../middlewares/authGuard.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidation, authController.register);

authRouter.get("/verify-email", authController.confirmRegister);

authRouter.post("/login", authController.auth);

authRouter.get("/check-user", authGuard, authController.checkUser);

export default authRouter;
