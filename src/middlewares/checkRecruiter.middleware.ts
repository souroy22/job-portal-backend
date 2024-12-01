import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "./verifyToken.middleware";
import AppError from "../utils/AppError.util";

export const checkRecruiter = (
  req: IGetUserAuthInfoRequest,
  _: Response,
  next: NextFunction
) => {
  if (req.user.user.role !== "recruiter") {
    throw new AppError("Access denied", 403);
  }
  next();
};
