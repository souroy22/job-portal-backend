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
const JobSeeker_model_1 = require("../models/JobSeeker.model");
const cloudinary_1 = require("cloudinary");
const AppError_util_1 = __importDefault(require("../utils/AppError.util"));
const User_model_1 = __importDefault(require("../models/User.model"));
const jobSeekerController = {
    createProfile: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { file } = req;
        let { skills, experience, education, preferences, expType } = req.body;
        skills = JSON.parse(skills);
        education = JSON.parse(education);
        preferences = JSON.parse(preferences);
        experience = JSON.parse(experience);
        expType = JSON.parse(expType);
        if (expType === "fresher") {
            experience = [];
        }
        if (!expType) {
            throw new AppError_util_1.default("Please select Experience Type", 400);
        }
        if (!skills || !Array.isArray(skills) || skills.length === 0) {
            throw new AppError_util_1.default("Skills must be a non-empty array.", 400);
        }
        if ((expType === "experienced" && !experience) ||
            !Array.isArray(experience)) {
            throw new AppError_util_1.default("Experience must be an array.", 400);
        }
        if (!education || !Array.isArray(education)) {
            throw new AppError_util_1.default("Education must be an array.", 400);
        }
        // Validate experience fields
        if (expType === "experienced") {
            for (const exp of experience) {
                if (!exp.company || !exp.role || !exp.startDate || !exp.endDate) {
                    throw new AppError_util_1.default("Each experience must have company, role, startDate and endDate.", 400);
                }
            }
        }
        // Validate education fields
        for (const edu of education) {
            if (!edu.institution || !edu.degree || !edu.yearOfPassing) {
                throw new AppError_util_1.default("Each education entry must have institution, degree, and yearOfPassing.", 400);
            }
        }
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const uploadResult = yield new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
            uploadStream.end(file.buffer);
        });
        const newProfile = new JobSeeker_model_1.JobSeekerProfile({
            userId: req.user.user.id,
            resume: uploadResult.secure_url,
            skills,
            experience,
            education,
            preferences,
            expType,
        });
        yield newProfile.save();
        yield User_model_1.default.findByIdAndUpdate(req.user.user.id, { finishedProfile: true });
        return res.status(201).json({
            message: "Profile created successfully.",
            profile: {
                resume: newProfile.resume,
                skills: newProfile.skills,
                experience: newProfile.experience,
                education: newProfile.education,
                preferences: newProfile.preferences,
                expType: newProfile.expType,
            },
        });
    })),
};
exports.default = jobSeekerController;
//# sourceMappingURL=JobSeeker.controller.js.map