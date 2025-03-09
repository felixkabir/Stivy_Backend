"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
const GetPostService_1 = require("./GetPostService");
class UpdatePostService {
    async execute({ postId, content }) {
        const post = await new GetPostService_1.GetPostService().execute({ postId });
        if (post === null) {
        }
        else {
            await PrismaHandler_1.prisma.post.update({
                where: { id: post.id },
                data: {
                    content
                }
            });
        }
    }
}
exports.UpdatePostService = UpdatePostService;
