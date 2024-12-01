import express from "express";
import authController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

export default authRouter;
