import { Schema, model, Document } from "mongoose";

type JOB_TYPE = "Full-time" | "Part-time" | "Contract";
type EXP_TYPE = "fresher" | "experienced";

export interface IJobSeekerProfile extends Document {
  userId: Schema.Types.ObjectId;
  resume?: string;
  expType: EXP_TYPE;
  skills: string[];
  experience: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    yearOfPassing: number;
  }[];
  preferences: {
    jobType?: JOB_TYPE[];
    location?: string;
  };
}

const jobSeekerProfileSchema = new Schema<IJobSeekerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    expType: { type: String, required: true },
    resume: { type: String },
    skills: { type: [String], required: true },
    experience: {
      type: [
        {
          company: { type: String, required: true },
          role: { type: String, required: true },
          startDate: { type: String, required: true },
          endDate: { type: String, required: true },
          description: { type: String },
        },
      ],
      default: [],
    },
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        yearOfPassing: { type: Number, required: true },
      },
    ],
    preferences: {
      jobType: { type: String, enum: ["Full-time", "Part-time", "Contract"] },
      location: { type: [String] },
    },
  },
  { timestamps: true }
);

export const JobSeekerProfile = model<IJobSeekerProfile>(
  "JobSeekerProfile",
  jobSeekerProfileSchema
);
