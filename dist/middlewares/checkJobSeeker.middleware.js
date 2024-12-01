"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJobSeeker = void 0;
const AppError_util_1 = __importDefault(require("../utils/AppError.util"));
const checkJobSeeker = (req, _, next) => {
    if (req.user.user.role !== "job_seeker") {
        throw new AppError_util_1.default("Access denied", 403);
    }
    next();
};
exports.checkJobSeeker = checkJobSeeker;
//# sourceMappingURL=checkJobSeeker.middleware.js.map