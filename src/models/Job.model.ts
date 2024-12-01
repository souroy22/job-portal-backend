import { Schema, model, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  company: Schema.Types.ObjectId;
  location: string;
  jobType: "Full-time" | "Part-time" | "Contract";
  salary?: number;
  requirements: string[];
  postedBy: Schema.Types.ObjectId;
  status: "open" | "closed";
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    status: { type: String, default: "open" },
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
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Job = model<IJob>("Job", jobSchema);
