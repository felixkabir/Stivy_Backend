"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteModelsFromAnAgencyService = void 0;
const deleteFile_1 = require("../../helpers/deleteFile");
const PrismaHandler_1 = require("../../PrismaHandler");
const GetAgencyService_1 = require("../agency-services/GetAgencyService");
const GetUserService_1 = require("../user-services/GetUserService");
class DeleteModelsFromAnAgencyService {
    async execute({ agencyId, agencyOwnerId, model_ids }) {
        if (model_ids && model_ids.length) {
            const user = await new GetUserService_1.GetUserService().execute({ userId: agencyOwnerId });
            const agency = await new GetAgencyService_1.GetAgencyService().execute({ agenceId: agencyId });
            if (user === null || agency === null) {
                return null;
            }
            if (agency.userId === user.id) {
                for (const model_id of model_ids) {
                    const modelToRemove = await PrismaHandler_1.prisma.modelEntity.findUnique({
                        where: { id: model_id },
                        include: { file_entity: true }
                    });
                    if (modelToRemove) {
                        await PrismaHandler_1.prisma.modelEntity.delete({
                            where: { id: modelToRemove.id }
                        });
                        for (const file of modelToRemove.file_entity) {
                            await (0, deleteFile_1.deleteFile)(file.file_key);
                        }
                    }
                }
            }
        }
    }
}
exports.DeleteModelsFromAnAgencyService = DeleteModelsFromAnAgencyService;
