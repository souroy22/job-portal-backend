"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const checkJobSeeker_middleware_1 = require("../middlewares/checkJobSeeker.middleware");
const application_controller_1 = __importDefault(require("../controllers/application.controller"));
const checkRecruiter_middleware_1 = require("../middlewares/checkRecruiter.middleware");
const applicationRouter = express_1.default.Router();
applicationRouter.post("/apply", verifyToken_middleware_1.verifyToken, checkJobSeeker_middleware_1.checkJobSeeker, application_controller_1.default.applyForJob);
applicationRouter.patch("/change-status", verifyToken_middleware_1.verifyToken, checkRecruiter_middleware_1.checkRecruiter, application_controller_1.default.changeApplicationStatus);
exports.default = applicationRouter;
//# sourceMappingURL=application.router.js.map