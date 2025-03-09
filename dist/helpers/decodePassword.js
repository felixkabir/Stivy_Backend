"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodePassword = decodePassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function decodePassword(password, hashedPassword) {
    const isMatch = await bcryptjs_1.default.compare(password, hashedPassword);
    return isMatch;
}
