"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserNotificationsController = void 0;
const GetUserNotificationsService_1 = require("../../services/notification-services/GetUserNotificationsService");
class GetUserNotificationsController {
    async handle(request, response) {
        const { userId } = request.params;
        const service = new GetUserNotificationsService_1.GetUserNotificationsService();
        const result = await service.execute({ userId });
        response.json(result);
    }
}
exports.GetUserNotificationsController = GetUserNotificationsController;
