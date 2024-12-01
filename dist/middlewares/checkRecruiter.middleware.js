"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRecruiter = void 0;
const AppError_util_1 = __importDefault(require("../utils/AppError.util"));
const checkRecruiter = (req, _, next) => {
    if (req.user.user.role !== "recruiter") {
        throw new AppError_util_1.default("Access denied", 403);
    }
    next();
};
exports.checkRecruiter = checkRecruiter;
//# sourceMappingURL=checkRecruiter.middleware.js.map