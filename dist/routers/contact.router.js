"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_controllers_1 = __importDefault(require("../controllers/contact.controllers"));
const checkMissingFields_1 = __importDefault(require("../middlewares/checkMissingFields"));
const pagination_1 = require("../utils/pagination");
const contactRouters = express_1.default.Router();
contactRouters.get("/all", pagination_1.paginateMiddleware, contact_controllers_1.default.getAllContacts);
contactRouters.post("/create", checkMissingFields_1.default.createContact, contact_controllers_1.default.createContact);
exports.default = contactRouters;
//# sourceMappingURL=contact.router.js.map