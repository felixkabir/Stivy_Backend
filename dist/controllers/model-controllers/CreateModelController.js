"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModelController = void 0;
const CreateModelService_1 = require("../../services/model-services/CreateModelService");
const deleteFile_1 = require("../../helpers/deleteFile");
class CreateModelController {
    async handle(request, response) {
        const { agencyId } = request.params;
        try {
            if (!agencyId) {
                await (0, deleteFile_1.deleteFile)(String(request.file?.filename));
                response.status(400).json({ message: "Agency Id is Required!" });
                return;
            }
            const { name, waist, height, shoes, contact, userId } = request.body;
            const service = new CreateModelService_1.CreateModelService();
            const result = await service.execute({
                agencyId,
                userId,
                name,
                waist,
                contact,
                shoes,
                height,
                file_key: String(request.file?.filename),
                file_url: String(request.file?.path),
            });
            if (result == null) {
                await (0, deleteFile_1.deleteFile)(String(request.file?.filename));
                response.status(404).json({ message: "Agency does not exist!" });
                return;
            }
            response.json(result);
        }
        catch (error) {
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.CreateModelController = CreateModelController;
