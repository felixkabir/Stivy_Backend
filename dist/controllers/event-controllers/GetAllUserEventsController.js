"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUserEventsController = void 0;
const GetAllUserEventsService_1 = require("../../services/event-services/GetAllUserEventsService");
class GetAllUserEventsController {
    async handle(request, response) {
        const { userId } = request.params;
        if (!userId) {
            response.status(400).json({ message: "User id is required!" });
            return;
        }
        const service = new GetAllUserEventsService_1.GetAllUserEventsService();
        const result = await service.execute({ userId });
        response.json(result);
    }
}
exports.GetAllUserEventsController = GetAllUserEventsController;
