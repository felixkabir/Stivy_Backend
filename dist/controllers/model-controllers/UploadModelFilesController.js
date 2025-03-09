"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModelFilesController = void 0;
const deleteFile_1 = require("../../helpers/deleteFile");
const UploadModelFilesService_1 = require("../../services/model-services/UploadModelFilesService");
class UploadModelFilesController {
    async handle(request, response) {
        const { modelId } = request.params;
        const { title } = request.body;
        try {
            if (!modelId) {
                const allFiles = request.files;
                allFiles.forEach(async (file) => {
                    await (0, deleteFile_1.deleteFile)(String(file.filename));
                });
                response.status(400).json({ message: "Model Id is required" });
            }
            const service = new UploadModelFilesService_1.UploadModelFilesService();
            const result = await service.execute({
                modelId,
                content: title,
                files: request.files
            });
            if (result === null) {
                const allFiles = request.files;
                allFiles.forEach(async (file) => {
                    await (0, deleteFile_1.deleteFile)(String(file.filename));
                });
            }
            response.json(result);
        }
        catch (error) {
            const allFiles = request.files;
            allFiles.forEach(async (file) => {
                await (0, deleteFile_1.deleteFile)(String(file.filename));
            });
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.UploadModelFilesController = UploadModelFilesController;
