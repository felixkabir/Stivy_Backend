"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAgencyController = void 0;
const GetAgencyService_1 = require("../../services/agency-services/GetAgencyService");
class GetAgencyController {
    async handle(request, response) {
        const { agenceId } = request.params;
        const service = new GetAgencyService_1.GetAgencyService();
        const result = await service.execute({ agenceId });
        if (result === null) {
            response.status(404).json({ message: "Agence not found!" });
            return;
        }
        response.json(result);
    }
}
exports.GetAgencyController = GetAgencyController;
