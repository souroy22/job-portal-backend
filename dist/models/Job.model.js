"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = require("mongoose");
const jobSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    status: { type: String, default: "open" },
    description: { type: String, required: true },
    company: { type: mongoose_1.Schema.Types.ObjectId, ref: "Company", required: true },
    location: { type: String, required: true },
    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract"],
        required: true,
    },
    salary: { type: Number },
    requirements: { type: [String], required: true },
    postedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.Job = (0, mongoose_1.model)("Job", jobSchema);
//# sourceMappingURL=Job.model.js.map