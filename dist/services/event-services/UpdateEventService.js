"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class UpdateEventService {
    async execute({ id, name, start_date, end_date, file_key, file_url }) {
        const event = await PrismaHandler_1.prisma.eventEntity.findUnique({ where: { id } });
        if (event) {
            await PrismaHandler_1.prisma.eventEntity.update({
                where: { id },
                data: {
                    end_date: end_date ? end_date : event.end_date,
                    name: name ? name : event.name,
                    start_date: start_date ? start_date : event.start_date,
                    file_key: file_key ? file_key : event.file_key,
                    file_url: file_url ? file_url : event.file_url,
                }
            });
        }
    }
}
exports.UpdateEventService = UpdateEventService;
