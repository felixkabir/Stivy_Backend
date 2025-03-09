"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetPostService {
    async execute({ postId }) {
        if (postId) {
            const post = await PrismaHandler_1.prisma.post.findUnique({
                where: { id: postId },
                include: { file_entity: true, user: true }
            });
            return post;
        }
        const allPosts = await PrismaHandler_1.prisma.post.findMany({
            orderBy: { created_at: "asc" },
            include: { file_entity: true, user: true }
        });
        return allPosts;
    }
}
exports.GetPostService = GetPostService;
