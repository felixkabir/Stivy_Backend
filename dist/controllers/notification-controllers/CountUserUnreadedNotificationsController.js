"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountUserUnreadedNotificationsController = void 0;
const CountUserUnreadedNotificationsService_1 = require("../../services/notification-services/CountUserUnreadedNotificationsService");
class CountUserUnreadedNotificationsController {
    async handle(request, response) {
        const { userId } = request.params;
        if (!userId) {
            response.status(400).json({ message: "User Id is required!" });
            return;
        }
        const service = new CountUserUnreadedNotificationsService_1.CountUserUnreadedNotificationsService();
        const result = await service.execute({ userId });
        response.json(result);
    }
}
exports.CountUserUnreadedNotificationsController = CountUserUnreadedNotificationsController;
