import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import { Company } from "../models/Company.model";
import AppError from "../utils/AppError.util";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.model";
import slugify from "slugify";
import ShortUniqueId from "short-unique-id";

const recruiterController = {
  createProfile: catchAsync(async (req: Request, res: Response) => {
    const { file } = req;
    let { name, description, industry, website, location } = req.body;
    name = JSON.parse(name);
    description = JSON.parse(description);
    industry = JSON.parse(industry);
    if (website) {
      website = JSON.parse(website);
    }
    location = JSON.parse(location);
    if (
      !name ||
      !description ||
      !industry ||
      !location ||
      !Array.isArray(location) ||
      !location.length
    ) {
      throw new AppError("All required fields must be provided.", 400);
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
    });
    let url = "https://getdrawings.com/free-icon-bw/company-icon-png-13.png";
    if (file) {
      const uploadResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });
      url = uploadResult.secure_url;
    }
    let slug = slugify(name.slice(0, 15).trim(), { lower: true });
    const isExist = await Company.findOne({ slug });
    if (isExist) {
      const uid = new ShortUniqueId({ length: 6 });
      slug += uid.rnd();
    }
    // Create a new company
    const newCompany = new Company({
      name,
      description,
      logo: url,
      industry,
      website,
      location,
      createdBy: req.user.user.id,
      slug,
    });

    // Save the company
    await newCompany.save();
    await User.findByIdAndUpdate(req.user.user.id, { finishedProfile: true });
    // Return success response with the created company
    res.status(201).json({
      message: "Company created successfully",
      company: newCompany,
    });
  }),
};

export default recruiterController;
