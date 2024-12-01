import express from "express";
import authController from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import messageController from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.post("/send", verifyToken, messageController.sendMessage);
messageRouter.post("/all", verifyToken, authController.login);

export default messageRouter;
