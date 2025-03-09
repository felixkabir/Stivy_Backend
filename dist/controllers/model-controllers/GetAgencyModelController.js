"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAgencyModelsController = void 0;
const GetAgencyModelsService_1 = require("../../services/model-services/GetAgencyModelsService");
class GetAgencyModelsController {
    async handle(request, response) {
        const { agenceId } = request.params;
        if (!agenceId) {
            response.status(400).json({ message: "Agence Id is Required!" });
            return;
        }
        const service = new GetAgencyModelsService_1.GetAgencyModelsService();
        const result = await service.execute({ agenceId });
        response.json(result);
    }
}
exports.GetAgencyModelsController = GetAgencyModelsController;
