"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const userRouter = express_1.default.Router();
userRouter.get("/get-user", verifyToken_middleware_1.verifyToken, user_controller_1.default.getUserData);
userRouter.get("/profile", verifyToken_middleware_1.verifyToken, user_controller_1.default.getProfileData);
userRouter.patch("/update-role", verifyToken_middleware_1.verifyToken, user_controller_1.default.updateRole);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map