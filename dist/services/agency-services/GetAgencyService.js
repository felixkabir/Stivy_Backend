"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAgencyService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetAgencyService {
    async execute({ agenceId }) {
        if (agenceId) {
            const agencyes = await PrismaHandler_1.prisma.agency.findUnique({
                where: { id: agenceId },
                include: { models: true, creator: true, Post: true, _count: true }
            });
            if (!agencyes) {
                return null;
            }
            return agencyes;
        }
        const agencies = await PrismaHandler_1.prisma.agency.findMany({
            include: { models: true, _count: true, creator: true, Post: true },
        });
        return agencies;
    }
}
exports.GetAgencyService = GetAgencyService;
