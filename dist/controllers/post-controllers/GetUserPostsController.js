"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserPostsController = void 0;
const GetUserPostsService_1 = require("../../services/post-services/GetUserPostsService");
class GetUserPostsController {
    async handle(request, response) {
        const { userId } = request.params;
        if (!userId) {
            response.status(400).json({ message: "User Id is required." });
            return;
        }
        const service = new GetUserPostsService_1.GetUserPostsService();
        const result = await service.execute({ userId });
        response.json(result);
    }
}
exports.GetUserPostsController = GetUserPostsController;
