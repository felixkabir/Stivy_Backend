"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHashPassword = generateHashPassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function generateHashPassword(password) {
    const salt = await bcryptjs_1.default.genSalt(Number(process.env.HASH_SALT));
    const passwordHashed = await bcryptjs_1.default.hash(password, salt);
    return passwordHashed;
}
