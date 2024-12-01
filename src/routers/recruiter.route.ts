import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { upload } from "../middlewares/multer.middleware";
import recruiterController from "../controllers/recruiter.controller";
import { checkRecruiter } from "../middlewares/checkRecruiter.middleware";

const recruiterRouter = express.Router();

recruiterRouter.post(
  "/create",
  verifyToken,
  checkRecruiter,
  upload.single("logo"),
  recruiterController.createProfile
);

export default recruiterRouter;
