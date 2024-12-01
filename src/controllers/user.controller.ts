import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import User from "../models/User.model";
import AppError from "../utils/AppError.util";

const userController = {
  getUserData: catchAsync(async (req: Request, res: Response) => {
    const { name, email, role, finishedProfile } = req.user.user;
    return res
      .status(200)
      .json({ user: { name, email, role, finishedProfile } });
  }),
  updateRole: catchAsync(async (req: Request, res: Response) => {
    const { newRole } = req.body;
    if (newRole !== "job_seeker" && newRole !== "recruiter") {
      throw new AppError("Invalid role type", 400);
    }
    const { name, email, role } = await User.findByIdAndUpdate(
      req.user.user.id,
      {
        role: newRole,
      },
      { new: true }
    );
    return res.status(200).json({ user: { name, email, role } });
  }),
};

export default userController;
