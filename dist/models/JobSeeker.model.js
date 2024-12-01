"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSeekerProfile = void 0;
const mongoose_1 = require("mongoose");
const jobSeekerProfileSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.JobSeekerProfile = (0, mongoose_1.model)("JobSeekerProfile", jobSeekerProfileSchema);
//# sourceMappingURL=JobSeeker.model.js.map