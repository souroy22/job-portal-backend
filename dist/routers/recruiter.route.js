"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const recruiter_controller_1 = __importDefault(require("../controllers/recruiter.controller"));
const checkRecruiter_middleware_1 = require("../middlewares/checkRecruiter.middleware");
const recruiterRouter = express_1.default.Router();
recruiterRouter.post("/create", verifyToken_middleware_1.verifyToken, checkRecruiter_middleware_1.checkRecruiter, multer_middleware_1.upload.single("logo"), recruiter_controller_1.default.createProfile);
exports.default = recruiterRouter;
//# sourceMappingURL=recruiter.route.js.map