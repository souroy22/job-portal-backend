import { Schema, model, Document } from "mongoose";

export interface IJobSeekerProfile extends Document {
  userId: Schema.Types.ObjectId;
  resume?: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    yearOfPassing: number;
  }[];
  preferences: {
    jobType?: "Full-time" | "Part-time" | "Contract";
    location?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const jobSeekerProfileSchema = new Schema<IJobSeekerProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    resume: { type: String },
    skills: { type: [String], required: true },
    experience: [
      {
        company: { type: String, required: true },
        role: { type: String, required: true },
        duration: { type: String, required: true },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        yearOfPassing: { type: Number, required: true },
      },
    ],
    preferences: {
      jobType: { type: String, enum: ["Full-time", "Part-time", "Contract"] },
      location: { type: String },
    },
  },
  { timestamps: true }
);

export const JobSeekerProfile = model<IJobSeekerProfile>(
  "JobSeekerProfile",
  jobSeekerProfileSchema
);
