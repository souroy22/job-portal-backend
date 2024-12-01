"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const mongoose_1 = require("mongoose");
const applicationSchema = new mongoose_1.Schema({
    jobId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: ["Applied", "In Review", "Shortlisted", "Rejected", "Accepted"],
        default: "Applied",
    },
}, { timestamps: true });
exports.Application = (0, mongoose_1.model)("Application", applicationSchema);
//# sourceMappingURL=Application.model.js.map