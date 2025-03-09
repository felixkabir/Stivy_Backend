"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostController = void 0;
const GetPostService_1 = require("../../services/post-services/GetPostService");
class GetPostController {
    async handle(request, response) {
        const { postId } = request.params;
        const service = new GetPostService_1.GetPostService();
        const result = await service.execute({ postId });
        if (result === null) {
            response.status(404).json({ message: "Post does not exist!" });
            return;
        }
        response.json(result);
    }
}
exports.GetPostController = GetPostController;
