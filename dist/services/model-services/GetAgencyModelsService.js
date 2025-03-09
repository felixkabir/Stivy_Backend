"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAgencyModelsService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetAgencyModelsService {
    async execute({ agenceId }) {
        const allAgencyModels = await PrismaHandler_1.prisma.modelEntity.findMany({
            where: {
                agencyId: agenceId
            },
            include: { file_entity: true }
        });
        return allAgencyModels;
    }
}
exports.GetAgencyModelsService = GetAgencyModelsService;
