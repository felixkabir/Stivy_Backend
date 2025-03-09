"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEventController = void 0;
const DeleteEventService_1 = require("../../services/event-services/DeleteEventService");
class DeleteEventController {
    async handle(request, response) {
        const { eventId } = request.params;
        const service = new DeleteEventService_1.DeleteEventService();
        const result = await service.execute({ eventId });
        response.json(result);
    }
}
exports.DeleteEventController = DeleteEventController;
