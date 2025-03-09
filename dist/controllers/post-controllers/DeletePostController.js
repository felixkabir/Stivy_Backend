"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostController = void 0;
const DeletePostService_1 = require("../../services/post-services/DeletePostService");
class DeletePostController {
    async handle(request, response) {
        const { postId } = request.params;
        try {
            if (!postId) {
                response.status(400).json({ message: "Post Id is required." });
                return;
            }
            const service = new DeletePostService_1.DeletePostService();
            const result = await service.execute({ postId });
            if (result !== null) {
                response.json(result);
                return;
            }
            response.status(404).json({ message: "Post does not exist!" });
        }
        catch (error) {
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.DeletePostController = DeletePostController;
