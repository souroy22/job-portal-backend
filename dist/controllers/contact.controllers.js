"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Contact_model_1 = __importDefault(require("../models/Contact.model"));
const checkForDuplicateContact_1 = require("../utils/checkForDuplicateContact");
const pagination_1 = require("../utils/pagination");
const router = express_1.default.Router();
// Create HR record
const contactController = {
    createContact: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, contactNumber, companyName, location, role } = req.body;
            const isExist = yield (0, checkForDuplicateContact_1.checkForDuplicateContact)(contactNumber);
            if (isExist) {
                return res
                    .status(400)
                    .json({ error: "This contact number is already exist" });
            }
            const newContact = new Contact_model_1.default({
                name,
                contactNumber,
                companyName,
                location,
                role,
            });
            yield newContact.save();
            res.status(201).json(newContact);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
    getAllContacts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { searchQuery, location, role } = req.query;
            const filter = {};
            if (searchQuery) {
                filter.$or = [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { contactNumber: { $regex: searchQuery, $options: "i" } },
                    { companyName: { $regex: searchQuery, $options: "i" } },
                ];
            }
            if (location) {
                filter.location = { $regex: location, $options: "i" };
            }
            if (role) {
                filter.role = role;
            }
            const contactsQuery = Contact_model_1.default.find(filter);
            const contacts = yield (0, pagination_1.paginate)(contactsQuery, req.pagination);
            return res.status(200).json(contacts);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
};
exports.default = contactController;
//# sourceMappingURL=contact.controllers.js.map