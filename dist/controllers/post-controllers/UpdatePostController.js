"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostController = void 0;
const UpdatePostService_1 = require("../../services/post-services/UpdatePostService");
class UpdatePostController {
    async handle(request, response) {
        const { postId } = request.params;
        const { content } = request.body;
        try {
            if (!postId) {
                response.json({ message: "Post id is required to update." });
                return;
            }
            const service = new UpdatePostService_1.UpdatePostService();
            const result = await service.execute({ postId, content });
            if (result === null) {
                response.status(404).json({ message: "Post not Found!" });
                return;
            }
            response.json(result);
        }
        catch (error) {
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.UpdatePostController = UpdatePostController;
