"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFileService = void 0;
const deleteFile_1 = require("../../helpers/deleteFile");
const PrismaHandler_1 = require("../../PrismaHandler");
class DeleteFileService {
    async execute({ entity_id, file_id }) {
        const modelsFileToDelete = await PrismaHandler_1.prisma.fileEntity.findUnique({
            where: { id: file_id, modelId: entity_id },
        });
        if (modelsFileToDelete) {
            await PrismaHandler_1.prisma.fileEntity.delete({ where: { id: modelsFileToDelete.id } });
            await (0, deleteFile_1.deleteFile)(modelsFileToDelete.file_key);
            return;
        }
        const postFileToDelete = await PrismaHandler_1.prisma.fileEntity.findMany({ where: { postId: entity_id } });
        if (postFileToDelete && postFileToDelete.length) {
            for (const file of postFileToDelete) {
                await PrismaHandler_1.prisma.fileEntity.delete({ where: { id: file.id } });
                await (0, deleteFile_1.deleteFile)(file.file_key);
            }
        }
    }
}
exports.DeleteFileService = DeleteFileService;
