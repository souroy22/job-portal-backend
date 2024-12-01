"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const JobSeeker_controller_1 = __importDefault(require("../controllers/JobSeeker.controller"));
const checkJobSeeker_middleware_1 = require("../middlewares/checkJobSeeker.middleware");
const jobSeekerRouter = express_1.default.Router();
jobSeekerRouter.post("/create", verifyToken_middleware_1.verifyToken, checkJobSeeker_middleware_1.checkJobSeeker, multer_middleware_1.upload.single("resume"), JobSeeker_controller_1.default.createProfile);
exports.default = jobSeekerRouter;
//# sourceMappingURL=jobSeeker.route.js.map