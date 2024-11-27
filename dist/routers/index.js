"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_router_1 = __importDefault(require("./contact.router"));
const routers = express_1.default.Router();
routers.use("/contact", contact_router_1.default);
exports.default = routers;
//# sourceMappingURL=index.js.map