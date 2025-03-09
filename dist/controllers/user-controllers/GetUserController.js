"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserController = void 0;
const GetUserService_1 = require("../../services/user-services/GetUserService");
const uuid_1 = require("uuid");
class GetUserController {
    async handle(request, response) {
        const { userId } = request.params;
        const service = new GetUserService_1.GetUserService();
        if (userId && !(0, uuid_1.validate)(userId)) {
            response.status(400).json({ message: "Invalid Id" });
            return;
        }
        const result = await service.execute({
            userId
        });
        if (result === null) {
            response.status(404).json({ message: "User not found" });
        }
        else {
            response.json(result);
        }
    }
}
exports.GetUserController = GetUserController;
