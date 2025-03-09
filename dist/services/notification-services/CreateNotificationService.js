"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class CreateNotificationService {
    async execute({ createdForId, creatorId, content }) {
        await PrismaHandler_1.prisma.notification.create({
            data: {
                createdForId,
                creatorId,
                content
            }
        });
    }
}
exports.CreateNotificationService = CreateNotificationService;
