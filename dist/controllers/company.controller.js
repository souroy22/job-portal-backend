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
const companyController = {
    getDetails: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.user.id;
        if (!req.user.user.finishedProfile) {
            throw new AppError_util_1.default("Please create your company profile first", 400);
        }
        const company = yield Company_model_1.Company.findOne({ createdBy: userId });
        if (!company) {
            throw new AppError_util_1.default("Company not found", 400);
        }
        return res.status(200).json({
            name: company.name,
            location: company.location,
            slug: company.slug,
        });
    })),
};
exports.default = companyController;
//# sourceMappingURL=company.controller.js.map