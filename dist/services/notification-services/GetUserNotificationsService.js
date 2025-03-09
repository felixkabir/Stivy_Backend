"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserNotificationsService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetUserNotificationsService {
    async execute({ userId }) {
        const notifications = await PrismaHandler_1.prisma.notification.findMany({
            where: { createdForId: userId },
            orderBy: { created_at: "asc" },
            include: { creator: true }
        });
        return notifications;
    }
}
exports.GetUserNotificationsService = GetUserNotificationsService;
