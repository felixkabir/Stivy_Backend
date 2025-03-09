"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
const DeleteFileService_1 = require("../file-services/DeleteFileService");
const GetPostService_1 = require("./GetPostService");
class DeletePostService {
    async execute({ postId }) {
        const post = await new GetPostService_1.GetPostService().execute({ postId });
        const fileService = new DeleteFileService_1.DeleteFileService();
        if (post) {
            await PrismaHandler_1.prisma.post.delete({ where: { id: post.id } });
            await fileService.execute({ entity_id: post.id });
        }
        else {
            return null;
        }
    }
}
exports.DeletePostService = DeletePostService;
