import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import { JobSeekerProfile } from "../models/JobSeeker.model";
import { v2 as cloudinary } from "cloudinary";
import AppError from "../utils/AppError.util";
import User from "../models/User.model";

const jobSeekerController = {
  createProfile: catchAsync(async (req: Request, res: Response) => {
    const { file } = req;
    let { skills, experience, education, preferences, expType } = req.body;

    skills = JSON.parse(skills);
    education = JSON.parse(education);
    preferences = JSON.parse(preferences);
    experience = JSON.parse(experience);
    expType = JSON.parse(expType);

    if (expType === "fresher") {
      experience = [];
    }

    if (!expType) {
      throw new AppError("Please select Experience Type", 400);
    }

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      throw new AppError("Skills must be a non-empty array.", 400);
    }

    if (
      (expType === "experienced" && !experience) ||
      !Array.isArray(experience)
    ) {
      throw new AppError("Experience must be an array.", 400);
    }

    if (!education || !Array.isArray(education)) {
      throw new AppError("Education must be an array.", 400);
    }

    // Validate experience fields
    if (expType === "experienced") {
      for (const exp of experience) {
        if (!exp.company || !exp.role || !exp.startDate || !exp.endDate) {
          throw new AppError(
            "Each experience must have company, role, startDate and endDate.",
            400
          );
        }
      }
    }

    // Validate education fields
    for (const edu of education) {
      if (!edu.institution || !edu.degree || !edu.yearOfPassing) {
        throw new AppError(
          "Each education entry must have institution, degree, and yearOfPassing.",
          400
        );
      }
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
    });

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

    const newProfile = new JobSeekerProfile({
      userId: req.user.user.id,
      resume: uploadResult.secure_url,
      skills,
      experience,
      education,
      preferences,
      expType,
    });

    await newProfile.save();
    await User.findByIdAndUpdate(req.user.user.id, { finishedProfile: true });

    return res.status(201).json({
      message: "Profile created successfully.",
      profile: {
        resume: newProfile.resume,
        skills: newProfile.skills,
        experience: newProfile.experience,
        education: newProfile.education,
        preferences: newProfile.preferences,
        expType: newProfile.expType,
      },
    });
  }),
};

export default jobSeekerController;
