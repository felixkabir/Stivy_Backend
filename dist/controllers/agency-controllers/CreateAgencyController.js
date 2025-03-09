"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAgencyController = void 0;
const CreateAgencyService_1 = require("../../services/agency-services/CreateAgencyService");
const deleteFile_1 = require("../../helpers/deleteFile");
class CreateAgencyController {
    async handle(request, response) {
        const { userId } = request.params;
        const { name, contact } = request.body;
        try {
            if (!userId) {
                await (0, deleteFile_1.deleteFile)(String(request.file?.filename));
                response.status(400).json({ message: "Id is required!" });
                return;
            }
            if (name.length > 0 && contact.length > 0) {
                const service = new CreateAgencyService_1.CreateAgencyService();
                const result = await service.execute({
                    userId: String(userId),
                    name,
                    contact,
                    file_key: String(request.file?.filename),
                    file_url: String(request.file?.path)
                });
                response.json(result);
                return;
            }
            else {
                response.status(400).json({ message: "Por favor, preencha todos os campos." });
            }
        }
        catch (error) {
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.CreateAgencyController = CreateAgencyController;
