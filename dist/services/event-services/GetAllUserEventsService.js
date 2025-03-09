"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUserEventsService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetAllUserEventsService {
    async execute({ userId }) {
        const allUserEvents = await PrismaHandler_1.prisma.eventEntity.findMany({
            where: { userId },
            orderBy: { created_at: "asc" },
            include: { user: true }
        });
        return allUserEvents;
    }
}
exports.GetAllUserEventsService = GetAllUserEventsService;
