"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetNotificationAsReadedService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class SetNotificationAsReadedService {
    async execute({ userId }) {
        await PrismaHandler_1.prisma.notification.updateMany({
            where: { createdForId: userId },
            data: { is_readed: true }
        });
    }
}
exports.SetNotificationAsReadedService = SetNotificationAsReadedService;
