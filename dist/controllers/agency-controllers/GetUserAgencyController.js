"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserAgencyController = void 0;
const GetUserAgencyService_1 = require("../../services/agency-services/GetUserAgencyService");
class GetUserAgencyController {
    async handle(request, response) {
        const { userId } = request.params;
        if (!userId) {
            response.status(400).json({ message: "User id is required to get all User agencies." });
            return;
        }
        const service = new GetUserAgencyService_1.GetUserAgencyService();
        const result = await service.execute({ userId });
        response.json(result);
    }
}
exports.GetUserAgencyController = GetUserAgencyController;
