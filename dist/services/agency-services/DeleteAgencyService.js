"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAgencyService = void 0;
const deleteFile_1 = require("../../helpers/deleteFile");
const PrismaHandler_1 = require("../../PrismaHandler");
class DeleteAgencyService {
    async execute({ agenceId, creator_id }) {
        const agenceToDelete = await PrismaHandler_1.prisma.agency.delete({ where: { id: agenceId } });
        if (agenceToDelete) {
            await (0, deleteFile_1.deleteFile)(String(agenceToDelete.file_key));
        }
    }
}
exports.DeleteAgencyService = DeleteAgencyService;
