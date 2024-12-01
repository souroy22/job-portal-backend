import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import { Application } from "../models/Application.model";

const applicationController = {
  applyForJob: catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.body;
    const newApplication = new Application({
      jobId,
      applicant: req.user.user.id,
    });
    await newApplication.save();
    return res.status(200).json({ message: "Successfully Applied" });
  }),
  changeApplicationStatus: catchAsync(async (req: Request, res: Response) => {
    const { jobId, applicant, status } = req.body;
    console.log("status", status);

    const updatedData = await Application.findOneAndUpdate(
      { jobId, applicant },
      { status },
      { new: true }
    );
    console.log("updatedData", updatedData);

    return res.status(200).json({ message: "Status updated successfully" });
  }),
};

export default applicationController;
