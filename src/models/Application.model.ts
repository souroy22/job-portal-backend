import { Schema, model, Document } from "mongoose";

export interface IApplication extends Document {
  jobId: Schema.Types.ObjectId;
  applicant: Schema.Types.ObjectId;
  status: "Applied" | "In Review" | "Shortlisted" | "Rejected" | "Accepted";
}

const applicationSchema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["Applied", "In Review", "Shortlisted", "Rejected", "Accepted"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

export const Application = model<IApplication>(
  "Application",
  applicationSchema
);
