"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const companySchema = new mongoose_1.Schema({
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
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.Company = (0, mongoose_1.model)("Company", companySchema);
//# sourceMappingURL=Company.model.js.map