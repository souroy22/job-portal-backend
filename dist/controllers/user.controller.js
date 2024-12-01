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
};
exports.default = userController;
//# sourceMappingURL=user.controller.js.map