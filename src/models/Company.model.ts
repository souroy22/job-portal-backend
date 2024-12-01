import { Schema, model, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  slug: string;
  description: string;
  industry: string;
  logo?: string;
  website?: string;
  location: string[];
  createdBy: Schema.Types.ObjectId;
}

const companySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    industry: { type: String, required: true },
    website: { type: String },
    logo: {
      type: String,
      default: "https://getdrawings.com/free-icon-bw/company-icon-png-13.png",
    },
    location: { type: [String], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Company = model<ICompany>("Company", companySchema);
