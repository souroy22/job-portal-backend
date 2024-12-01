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
const Company_model_1 = require("../models/Company.model");
const AppError_util_1 = __importDefault(require("../utils/AppError.util"));
const cloudinary_1 = require("cloudinary");
const User_model_1 = __importDefault(require("../models/User.model"));
const slugify_1 = __importDefault(require("slugify"));
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const recruiterController = {
    createProfile: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { file } = req;
        let { name, description, industry, website, location } = req.body;
        name = JSON.parse(name);
        description = JSON.parse(description);
        industry = JSON.parse(industry);
        if (website) {
            website = JSON.parse(website);
        }
        location = JSON.parse(location);
        if (!name ||
            !description ||
            !industry ||
            !location ||
            !Array.isArray(location) ||
            !location.length) {
            throw new AppError_util_1.default("All required fields must be provided.", 400);
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
        let slug = (0, slugify_1.default)(name.slice(0, 15).trim(), { lower: true });
        const isExist = yield Company_model_1.Company.findOne({ slug });
        if (isExist) {
            const uid = new short_unique_id_1.default({ length: 6 });
            slug += uid.rnd();
        }
        // Create a new company
        const newCompany = new Company_model_1.Company({
            name,
            description,
            logo: uploadResult.secure_url,
            industry,
            website,
            location,
            createdBy: req.user.user.id,
            slug,
        });
        // Save the company
        yield newCompany.save();
        yield User_model_1.default.findByIdAndUpdate(req.user.user.id, { finishedProfile: true });
        // Return success response with the created company
        res.status(201).json({
            message: "Company created successfully",
            company: newCompany,
        });
    })),
};
exports.default = recruiterController;
//# sourceMappingURL=recruiter.controller.js.map