"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetNotificationAsReadedController = void 0;
const SetNotificationAsReadedService_1 = require("../../services/notification-services/SetNotificationAsReadedService");
class SetNotificationAsReadedController {
    async handle(request, response) {
        const { userId } = request.params;
        const service = new SetNotificationAsReadedService_1.SetNotificationAsReadedService();
        const result = await service.execute({ userId });
        response.json(result);
    }
}
exports.SetNotificationAsReadedController = SetNotificationAsReadedController;
