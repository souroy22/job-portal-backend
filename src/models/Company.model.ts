import { Schema, model, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  description: string;
  industry: string;
  website?: string;
  location: string;
  postedBy: Schema.Types.ObjectId;
}

const companySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    industry: { type: String, required: true },
    website: { type: String },
    location: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Company = model<ICompany>("Company", companySchema);
