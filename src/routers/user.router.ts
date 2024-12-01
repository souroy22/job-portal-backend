import express from "express";
import userController from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";

const userRouter = express.Router();

userRouter.get("/get-user", verifyToken, userController.getUserData);
userRouter.get("/profile", verifyToken, userController.getProfileData);
userRouter.patch("/update-role", verifyToken, userController.updateRole);

export default userRouter;
