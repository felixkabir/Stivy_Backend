"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class CreateEventService {
    async execute({ name, start_date, end_date, userId, file_key, file_url }) {
        const newEvent = await PrismaHandler_1.prisma.eventEntity.create({
            data: {
                end_date,
                name,
                start_date,
                userId,
                file_key,
                file_url,
            },
            include: { user: true }
        });
        return newEvent;
    }
}
exports.CreateEventService = CreateEventService;
