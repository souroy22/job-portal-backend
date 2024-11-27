import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "job_seeker" | "recruiter";
  profile: Record<string, unknown>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["job_seeker", "recruiter"], required: true },
    profile: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
