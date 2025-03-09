"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEventService = void 0;
const deleteFile_1 = require("../../helpers/deleteFile");
const PrismaHandler_1 = require("../../PrismaHandler");
class DeleteEventService {
    async execute({ eventId }) {
        const event = await PrismaHandler_1.prisma.eventEntity.findUnique({
            where: { id: eventId }
        });
        if (event) {
            await (0, deleteFile_1.deleteFile)(String(event.file_key));
            await PrismaHandler_1.prisma.eventEntity.delete({ where: { id: event.id } });
        }
        else {
            return event;
        }
    }
}
exports.DeleteEventService = DeleteEventService;
