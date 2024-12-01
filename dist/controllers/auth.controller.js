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
const token_util_1 = __importDefault(require("../utils/token.util"));
const user_util_1 = __importDefault(require("../utils/user.util"));
const User_model_1 = __importDefault(require("../models/User.model"));
const verifyPassword_util_1 = __importDefault(require("../utils/verifyPassword.util"));
const authController = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password, role = null } = req.body;
            if (!(name && email && password)) {
                return res.status(400).json({ error: "Please fill all the details" });
            }
            const isExist = yield (0, user_util_1.default)(email);
            if (isExist !== null) {
                return res
                    .status(400)
                    .json({ error: "This mail id is already exist." });
            }
            const newUser = new User_model_1.default({ name, email, password, role });
            yield newUser.save();
            const user = {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                finishedProfile: newUser.finishedProfile,
            };
            const token = yield (0, token_util_1.default)({
                email: newUser.email,
                id: newUser.id,
            });
            return res.status(200).json({
                user,
                token,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: error.message });
            }
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ error: "Please fill all the details" });
        }
        const isExist = yield (0, user_util_1.default)(email);
        if (isExist === null) {
            return res.status(400).json({ error: "This mailid doen't exists" });
        }
        const isVerified = yield (0, verifyPassword_util_1.default)(password, isExist.password);
        if (!isVerified) {
            return res
                .status(401)
                .json({ error: "EmailId or password doesn't match" });
        }
        const user = {
            name: isExist.name,
            email: isExist.email,
            role: isExist.role,
            finishedProfile: isExist.finishedProfile,
        };
        const token = yield (0, token_util_1.default)({ email: isExist.email, id: isExist.id });
        return res.status(200).json({
            user,
            token,
        });
    }),
};
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map