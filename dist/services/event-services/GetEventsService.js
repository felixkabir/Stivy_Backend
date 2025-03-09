"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventsService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetEventsService {
    async execute() {
        const allEvents = await PrismaHandler_1.prisma.eventEntity.findMany({
            include: { user: true },
            orderBy: { created_at: "asc" }
        });
        return allEvents;
    }
}
exports.GetEventsService = GetEventsService;
