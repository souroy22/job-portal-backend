import { Schema, model, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  company: Schema.Types.ObjectId;
  location: string;
  jobType: "Full-time" | "Part-time" | "Contract";
  salary?: number;
  requirements: string[];
  responsibilities: string[];
  postedBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    location: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract"],
      required: true,
    },
    salary: { type: Number },
    requirements: { type: [String], required: true },
    responsibilities: { type: [String], required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Job = model<IJob>("Job", jobSchema);
