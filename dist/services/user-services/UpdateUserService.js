"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
const GetUserService_1 = require("./GetUserService");
class UpdateUserService {
    async execute({ id, email, username }) {
        const user = await new GetUserService_1.GetUserService().execute({ userId: id });
        if (!user) {
            return null;
        }
        const updatedUser = await PrismaHandler_1.prisma.user.update({
            where: { id },
            data: {
                email,
                username
            },
            select: {
                id: true,
                created_at: true,
                username: true,
                email: true,
                file_url: true,
            }
        });
        return updatedUser;
    }
}
exports.UpdateUserService = UpdateUserService;
