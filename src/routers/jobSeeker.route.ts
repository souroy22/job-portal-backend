import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { upload } from "../middlewares/multer.middleware";
import jobSeekerController from "../controllers/JobSeeker.controller";
import { checkJobSeeker } from "../middlewares/checkJobSeeker.middleware";

const jobSeekerRouter = express.Router();

jobSeekerRouter.post(
  "/create",
  verifyToken,
  checkJobSeeker,
  upload.single("resume"),
  jobSeekerController.createProfile
);

export default jobSeekerRouter;
