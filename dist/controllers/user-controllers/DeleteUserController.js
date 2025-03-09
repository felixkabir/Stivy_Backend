"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const DeleteUserService_1 = require("../../services/user-services/DeleteUserService");
class DeleteUserController {
    async handle(request, response) {
        const { userId } = request.params;
        try {
            if (!userId) {
                response.status(400).json({ message: "Id is required!" });
                return;
            }
            const service = new DeleteUserService_1.DeleteUserService();
            const result = await service.execute({ userId });
            response.json(result);
        }
        catch (error) {
            response.status(404).json({ message: "User to delete does not exist!" });
        }
    }
}
exports.DeleteUserController = DeleteUserController;
