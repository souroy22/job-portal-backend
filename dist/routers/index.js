"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./auth.router"));
const user_router_1 = __importDefault(require("./user.router"));
const jobSeeker_route_1 = __importDefault(require("./jobSeeker.route"));
const recruiter_route_1 = __importDefault(require("./recruiter.route"));
const company_router_1 = __importDefault(require("./company.router"));
const job_router_1 = __importDefault(require("./job.router"));
const application_router_1 = __importDefault(require("./application.router"));
const routers = express_1.default.Router();
routers.use("/auth", auth_router_1.default);
routers.use("/user", user_router_1.default);
routers.use("/profile/candidate", jobSeeker_route_1.default);
routers.use("/profile/company", recruiter_route_1.default);
routers.use("/company", company_router_1.default);
routers.use("/job", job_router_1.default);
routers.use("/application", application_router_1.default);
exports.default = routers;
//# sourceMappingURL=index.js.map