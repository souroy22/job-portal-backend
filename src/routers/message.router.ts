import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import messageController from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.post("/send", verifyToken, messageController.sendMessage);
messageRouter.get("/all", verifyToken, messageController.getMessages);

export default messageRouter;
