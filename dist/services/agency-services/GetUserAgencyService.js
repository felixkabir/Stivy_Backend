"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserAgencyService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetUserAgencyService {
    async execute({ userId }) {
        const [allUserAgencies, total] = await PrismaHandler_1.prisma.$transaction([
            PrismaHandler_1.prisma.agency.findMany({
                where: { userId },
                include: { creator: true, models: true }
            }),
            PrismaHandler_1.prisma.agency.count({
                where: { userId }
            })
        ]);
        return {
            allUserAgencies,
            totalOfUserAgencies: total
        };
    }
}
exports.GetUserAgencyService = GetUserAgencyService;
