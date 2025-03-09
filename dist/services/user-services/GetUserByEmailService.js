"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByEmailService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetUserByEmailService {
    async execute(email) {
        const user = await PrismaHandler_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user)
            return null;
        return user;
    }
}
exports.GetUserByEmailService = GetUserByEmailService;
