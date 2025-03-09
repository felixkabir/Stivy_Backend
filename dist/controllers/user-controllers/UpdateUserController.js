"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const UpdateUserService_1 = require("../../services/user-services/UpdateUserService");
const deleteFile_1 = require("../../helpers/deleteFile");
const uuid_1 = require("uuid");
class UpdateUserController {
    async handle(request, response) {
        const { userId } = request.params;
        const { email, username } = request.body;
        const service = new UpdateUserService_1.UpdateUserService();
        try {
            if (!userId) {
                (0, deleteFile_1.deleteFile)(String(request.file?.filename));
                response.status(400).json({ message: "Please, enter the user id to update" });
                return;
            }
            if (userId && !(0, uuid_1.validate)(userId)) {
                (0, deleteFile_1.deleteFile)(String(request.file?.filename));
                response.status(400).json({ message: "Invalid user id!" });
                return;
            }
            const result = await service.execute({
                id: userId,
                email,
                username,
            });
            response.json(result);
        }
        catch (error) {
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.UpdateUserController = UpdateUserController;
