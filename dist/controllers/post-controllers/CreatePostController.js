"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostController = void 0;
const CreatePostService_1 = require("../../services/post-services/CreatePostService");
const deleteFile_1 = require("../../helpers/deleteFile");
class CreatePostController {
    async handle(request, response) {
        const { entityId } = request.params;
        const { content } = request.body;
        const { type } = request.query;
        try {
            const service = new CreatePostService_1.CreatePostService();
            const result = await service.execute({
                entityId,
                content,
                type: String(type).toUpperCase(),
                files: request.files
            });
            if (!result) {
                const allFiles = request.files;
                allFiles.forEach(async (file) => {
                    await (0, deleteFile_1.deleteFile)(String(file.filename));
                });
            }
            response.json(result);
        }
        catch (error) {
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.CreatePostController = CreatePostController;
