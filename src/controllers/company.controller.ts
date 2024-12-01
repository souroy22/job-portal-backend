import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import { Company } from "../models/Company.model";
import AppError from "../utils/AppError.util";

const companyController = {
  getDetails: catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.user.id;
    if (!req.user.user.finishedProfile) {
      throw new AppError("Please create your company profile first", 400);
    }
    const company = await Company.findOne({ createdBy: userId });
    if (!company) {
      throw new AppError("Company not found", 400);
    }
    return res.status(200).json({
      name: company.name,
      location: company.location,
      slug: company.slug,
    });
  }),
};

export default companyController;
