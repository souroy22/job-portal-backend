"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const checkRecruiter_middleware_1 = require("../middlewares/checkRecruiter.middleware");
const job_controller_1 = __importDefault(require("../controllers/job.controller"));
const checkJobSeeker_middleware_1 = require("../middlewares/checkJobSeeker.middleware");
const pagination_util_1 = require("../utils/pagination.util");
const jobRouter = express_1.default.Router();
jobRouter.get("/all", verifyToken_middleware_1.verifyToken, checkJobSeeker_middleware_1.checkJobSeeker, pagination_util_1.paginateMiddleware, job_controller_1.default.getAllJobs);
jobRouter.get("/posted-jobs", verifyToken_middleware_1.verifyToken, checkRecruiter_middleware_1.checkRecruiter, pagination_util_1.paginateMiddleware, job_controller_1.default.getPostedJobs);
jobRouter.get("/applied-jobs", verifyToken_middleware_1.verifyToken, checkJobSeeker_middleware_1.checkJobSeeker, job_controller_1.default.appliedJobs);
jobRouter.get("/details/:jobId", verifyToken_middleware_1.verifyToken, job_controller_1.default.getJobDetails);
jobRouter.post("/create", verifyToken_middleware_1.verifyToken, checkRecruiter_middleware_1.checkRecruiter, job_controller_1.default.createJob);
jobRouter.get("/recommended-job", verifyToken_middleware_1.verifyToken, checkJobSeeker_middleware_1.checkJobSeeker, job_controller_1.default.getRecommendedJobs);
jobRouter.patch("/update/:jobId", verifyToken_middleware_1.verifyToken, checkRecruiter_middleware_1.checkRecruiter, job_controller_1.default.changeJobStatus);
exports.default = jobRouter;
//# sourceMappingURL=job.router.js.map