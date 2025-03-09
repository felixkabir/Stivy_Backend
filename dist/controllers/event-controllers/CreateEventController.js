"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventController = void 0;
const CreateEventService_1 = require("../../services/event-services/CreateEventService");
const deleteFile_1 = require("../../helpers/deleteFile");
class CreateEventController {
    async handle(request, response) {
        const { userId } = request.params;
        const { name, end_date, start_date } = request.body;
        if (!userId) {
            await (0, deleteFile_1.deleteFile)(String(request.file?.filename));
            response.status(400).json({ message: "User id is required!" });
            return;
        }
        try {
            const service = new CreateEventService_1.CreateEventService();
            const result = await service.execute({
                name,
                end_date,
                start_date,
                userId,
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
exports.CreateEventController = CreateEventController;
