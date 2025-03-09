"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModelService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class CreateModelService {
    async execute({ height, name, shoes, userId, waist, agencyId, contact, file_key, file_url }) {
        const verifyAgency = await PrismaHandler_1.prisma.agency.findUnique({ where: { id: agencyId } });
        const user = await PrismaHandler_1.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user)
            return null;
        if (!verifyAgency)
            return null;
        const newModel = await PrismaHandler_1.prisma.modelEntity.create({
            data: {
                name,
                height,
                shoes,
                waist,
                contact,
                file_url,
                file_key,
                userId: user.id,
                agencyId: verifyAgency.id
            }
        });
        if (newModel) {
            return newModel;
        }
    }
}
exports.CreateModelService = CreateModelService;
