"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteModelFileController = void 0;
const DeleteFileService_1 = require("../../services/file-services/DeleteFileService");
class DeleteModelFileController {
    async handle(request, response) {
        const { modelId, fileId } = request.params;
        try {
            if (modelId && fileId) {
                const service = new DeleteFileService_1.DeleteFileService();
                const result = await service.execute({
                    entity_id: modelId,
                    file_id: fileId
                });
                response.json(result);
            }
            else {
                response.status(400).json({ message: "${modelId}/${fileId} are required!" });
            }
        }
        catch (error) {
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.DeleteModelFileController = DeleteModelFileController;
