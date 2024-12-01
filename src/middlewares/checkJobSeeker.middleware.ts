import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "./verifyToken.middleware";
import AppError from "../utils/AppError.util";

export const checkJobSeeker = (
  req: IGetUserAuthInfoRequest,
  _: Response,
  next: NextFunction
) => {
  if (req.user.user.role !== "job_seeker") {
    throw new AppError("Access denied", 403);
  }
  next();
};
