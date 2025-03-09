"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventController = void 0;
const UpdateEventService_1 = require("../../services/event-services/UpdateEventService");
const deleteFile_1 = require("../../helpers/deleteFile");
class UpdateEventController {
    async handle(request, response) {
        const { eventId } = request.params;
        const { name, end_date, start_date } = request.body;
        try {
            if (!eventId) {
                await (0, deleteFile_1.deleteFile)(String(request.file?.filename));
                response.status(400).json({ message: "Event id is required!" });
                return;
            }
            const service = new UpdateEventService_1.UpdateEventService();
            const result = await service.execute({
                id: eventId,
                name,
                end_date,
                start_date,
                file_key: String(request.file?.filename),
                file_url: String(request.file?.path)
            });
            response.json(result);
        }
        catch (error) {
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.UpdateEventController = UpdateEventController;
