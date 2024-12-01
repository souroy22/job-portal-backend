"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const messageRouter = express_1.default.Router();
messageRouter.post("/send", verifyToken_middleware_1.verifyToken, message_controller_1.default.sendMessage);
messageRouter.post("/all", verifyToken_middleware_1.verifyToken, auth_controller_1.default.login);
exports.default = messageRouter;
//# sourceMappingURL=message.router.js.map