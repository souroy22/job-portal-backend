import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.util";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isOperational) {
    // Known and expected error
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  console.error("Unexpected Error: ", err); // Log unexpected errors for debugging
  return res.status(500).json({
    error: "Something went wrong! Please try again later.",
  });
};

export default errorHandler;
