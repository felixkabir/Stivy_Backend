"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountUserUnreadedNotificationsService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class CountUserUnreadedNotificationsService {
    async execute({ userId }) {
        const totalOfUnreadedUserNotifications = await PrismaHandler_1.prisma.notification.count({
            where: { createdForId: userId, is_readed: false }
        });
        return totalOfUnreadedUserNotifications;
    }
}
exports.CountUserUnreadedNotificationsService = CountUserUnreadedNotificationsService;
