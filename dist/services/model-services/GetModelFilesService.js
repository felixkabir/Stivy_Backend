"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetModelFilesService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetModelFilesService {
    async execute({ modelId }) {
        const model = await PrismaHandler_1.prisma.modelEntity.findUnique({
            where: { id: modelId }
        });
        if (model) {
            const allModelFiles = await PrismaHandler_1.prisma.post.findMany({
                where: {
                    modelId: model.id,
                    is_work_model: true,
                    type: "MODEL"
                },
                orderBy: { created_at: "asc" },
                include: { file_entity: true, model_entity: true }
            });
            return allModelFiles;
        }
        return null;
    }
}
exports.GetModelFilesService = GetModelFilesService;
