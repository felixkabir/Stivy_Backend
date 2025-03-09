"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserPostsService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetUserPostsService {
    async execute({ userId }) {
        const posts = await PrismaHandler_1.prisma.post.findMany({
            where: { userId: userId },
            include: { user: true, file_entity: true }
        });
        return posts;
    }
}
exports.GetUserPostsService = GetUserPostsService;
