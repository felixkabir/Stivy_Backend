"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllPlatformModelsService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class ListAllPlatformModelsService {
    async execute() {
        const allPlatFormModels = await PrismaHandler_1.prisma.modelEntity.findMany({
            include: {
                agency: true,
                file_entity: true,
            }
        });
        return allPlatFormModels;
    }
}
exports.ListAllPlatformModelsService = ListAllPlatformModelsService;
