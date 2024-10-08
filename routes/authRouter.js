import express from "express";
import authController from "../controllers/authController.js";
import { registerValidation } from "../middlewares/register.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidation, authController.register);

authRouter.get("/verify-email", authController.confirmRegister);

export default authRouter;
