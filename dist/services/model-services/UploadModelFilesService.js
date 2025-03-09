"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModelFilesService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
const CreateFileService_1 = require("../file-services/CreateFileService");
class UploadModelFilesService {
    async execute({ modelId, content, files }) {
        const model = await PrismaHandler_1.prisma.modelEntity.findUnique({
            where: { id: modelId }
        });
        const fileService = new CreateFileService_1.CreateFileService();
        if (model) {
            const post = await PrismaHandler_1.prisma.post.create({
                data: {
                    modelId: model.id,
                    content,
                    type: "MODEL",
                    is_work_model: true
                }
            });
            await fileService.execute({ entity_id: model.id, files: files, entity_type: "MODEL", post_id: post.id });
            const modelFilesUploadeds = await PrismaHandler_1.prisma.post.findMany({
                where: { modelId: model.id, is_work_model: true },
                orderBy: { created_at: "desc" },
                include: { model_entity: true, file_entity: true }
            });
            return modelFilesUploadeds[0];
        }
    }
}
exports.UploadModelFilesService = UploadModelFilesService;
