import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import User from "../models/User.model";
import AppError from "../utils/AppError.util";
import { JobSeekerProfile } from "../models/JobSeeker.model";
import { Company } from "../models/Company.model";

const userController = {
  getUserData: catchAsync(async (req: Request, res: Response) => {
    const { name, email, role, finishedProfile, id } = req.user.user;
    return res
      .status(200)
      .json({ user: { name, email, role, finishedProfile, id } });
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
  getProfileData: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing." });
    }

    // Find the user
    const user = req.user.user;

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check the role and fetch corresponding profile data
    if (user.role === "job_seeker") {
      const jobSeekerProfile: any = await JobSeekerProfile.findOne({
        userId: userId,
      });

      if (!jobSeekerProfile) {
        return res
          .status(404)
          .json({ message: "Job seeker profile not found." });
      }

      return res.status(200).json({
        role: user.role,
        name: user.name,
        email: user.email,
        id: userId,
        ...jobSeekerProfile._doc,
      });
    } else if (user.role === "recruiter") {
      const companyProfile: any = await Company.findOne({ createdBy: userId });

      if (!companyProfile) {
        return res.status(404).json({ message: "Company profile not found." });
      }

      return res.status(200).json({
        role: user.role,
        name: user.name,
        email: user.email,
        id: userId,
        ...companyProfile._doc,
      });
    } else {
      return res.status(400).json({ message: "Invalid role." });
    }
  }),
};

export default userController;
