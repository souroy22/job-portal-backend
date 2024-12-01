"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const checkRecruiter_middleware_1 = require("../middlewares/checkRecruiter.middleware");
const company_controller_1 = __importDefault(require("../controllers/company.controller"));
const companyRouter = express_1.default.Router();
companyRouter.get("/details", verifyToken_middleware_1.verifyToken, checkRecruiter_middleware_1.checkRecruiter, company_controller_1.default.getDetails);
exports.default = companyRouter;
//# sourceMappingURL=company.router.js.map