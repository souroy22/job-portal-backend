import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { checkRecruiter } from "../middlewares/checkRecruiter.middleware";
import jobController from "../controllers/job.controller";
import { checkJobSeeker } from "../middlewares/checkJobSeeker.middleware";
import { paginateMiddleware } from "../utils/pagination.util";

const jobRouter = express.Router();

jobRouter.get(
  "/all",
  verifyToken,
  checkJobSeeker,
  paginateMiddleware,
  jobController.getAllJobs
);
jobRouter.get(
  "/posted-jobs",
  verifyToken,
  checkRecruiter,
  paginateMiddleware,
  jobController.getPostedJobs
);
jobRouter.get("/details/:jobId", verifyToken, jobController.getJobDetails);
jobRouter.post("/create", verifyToken, checkRecruiter, jobController.createJob);
jobRouter.get(
  "/recommended-job",
  verifyToken,
  checkJobSeeker,
  jobController.getRecommendedJobs
);

export default jobRouter;
