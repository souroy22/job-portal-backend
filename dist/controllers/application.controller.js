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
const Application_model_1 = require("../models/Application.model");
const applicationController = {
    applyForJob: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { jobId } = req.body;
        const newApplication = new Application_model_1.Application({
            jobId,
            applicant: req.user.user.id,
        });
        yield newApplication.save();
        return res.status(200).json({ message: "Successfully Applied" });
    })),
    changeApplicationStatus: (0, catchAsync_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { jobId, applicant, status } = req.body;
        console.log("status", status);
        const updatedData = yield Application_model_1.Application.findOneAndUpdate({ jobId, applicant }, { status }, { new: true });
        console.log("updatedData", updatedData);
        return res.status(200).json({ message: "Status updated successfully" });
    })),
};
exports.default = applicationController;
//# sourceMappingURL=application.controller.js.map