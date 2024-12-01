import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { checkRecruiter } from "../middlewares/checkRecruiter.middleware";
import companyController from "../controllers/company.controller";

const companyRouter = express.Router();

companyRouter.get(
  "/details",
  verifyToken,
  checkRecruiter,
  companyController.getDetails
);

export default companyRouter;
