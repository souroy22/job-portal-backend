"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_util_1 = __importDefault(require("../utils/catchAsync.util"));
const User_model_1 = __importDefault(require("../models/User.model"));
const AppError_util_1 = __importDefault(require("../utils/AppError.util"));
const JobSeeker_model_1 = require("../models/JobSeeker.model");
const Company_model_1 = require("../models/Company.model");
const userController = {
    getUserData: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, role, finishedProfile, id } = req.user.user;
        return res
            .status(200)
            .json({ user: { name, email, role, finishedProfile, id } });
    })),
    updateRole: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { newRole } = req.body;
        if (newRole !== "job_seeker" && newRole !== "recruiter") {
            throw new AppError_util_1.default("Invalid role type", 400);
        }
        const { name, email, role } = yield User_model_1.default.findByIdAndUpdate(req.user.user.id, {
            role: newRole,
        }, { new: true });
        return res.status(200).json({ user: { name, email, role } });
    })),
    getProfileData: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing." });
        }
        // Find the user
        const user = req.user.user;
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Check the role and fetch corresponding profile data
        if (user.role === "job_seeker") {
            const jobSeekerProfile = yield JobSeeker_model_1.JobSeekerProfile.findOne({
                userId: userId,
            });
            if (!jobSeekerProfile) {
                return res
                    .status(404)
                    .json({ message: "Job seeker profile not found." });
            }
            return res.status(200).json(Object.assign({ role: user.role, name: user.name, email: user.email, id: userId }, jobSeekerProfile._doc));
        }
        else if (user.role === "recruiter") {
            const companyProfile = yield Company_model_1.Company.findOne({ createdBy: userId });
            if (!companyProfile) {
                return res.status(404).json({ message: "Company profile not found." });
            }
            return res.status(200).json(Object.assign({ role: user.role, name: user.name, email: user.email, id: userId }, companyProfile._doc));
        }
        else {
            return res.status(400).json({ message: "Invalid role." });
        }
    })),
};
exports.default = userController;
//# sourceMappingURL=user.controller.js.map