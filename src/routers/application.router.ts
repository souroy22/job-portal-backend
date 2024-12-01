import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { checkJobSeeker } from "../middlewares/checkJobSeeker.middleware";
import applicationController from "../controllers/application.controller";
import { checkRecruiter } from "../middlewares/checkRecruiter.middleware";

const applicationRouter = express.Router();

applicationRouter.post(
  "/apply",
  verifyToken,
  checkJobSeeker,
  applicationController.applyForJob
);

applicationRouter.patch(
  "/change-status",
  verifyToken,
  checkRecruiter,
  applicationController.changeApplicationStatus
);

export default applicationRouter;
