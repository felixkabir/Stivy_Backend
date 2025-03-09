"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class CreateUserService {
    async execute({ username, email, password, file_key, file_url }) {
        const newUser = await PrismaHandler_1.prisma.user.create({
            data: {
                username,
                email,
                password,
                file_key,
                file_url
            }
        });
        return newUser;
    }
}
exports.CreateUserService = CreateUserService;
