"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventsController = void 0;
const GetEventsService_1 = require("../../services/event-services/GetEventsService");
class GetEventsController {
    async handle(request, response) {
        const service = new GetEventsService_1.GetEventsService();
        const result = await service.execute();
        response.json(result);
    }
}
exports.GetEventsController = GetEventsController;
