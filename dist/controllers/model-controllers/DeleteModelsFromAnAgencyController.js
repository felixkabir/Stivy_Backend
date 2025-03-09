"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteModelsFromAnAgencyController = void 0;
const DeleteModelsFromAnAgencyService_1 = require("../../services/model-services/DeleteModelsFromAnAgencyService");
class DeleteModelsFromAnAgencyController {
    async handle(request, response) {
        const { agencyId, agencyOwnerId } = request.params;
        try {
            if (agencyId && agencyOwnerId) {
                const { model_ids } = request.body;
                const service = new DeleteModelsFromAnAgencyService_1.DeleteModelsFromAnAgencyService();
                const result = await service.execute({
                    agencyId,
                    agencyOwnerId,
                    model_ids
                });
                if (result === null) {
                    response.status(400).json({ message: "Id da agencia ou do proprietario invalido!" });
                    return;
                }
                response.json(result);
            }
            else {
                response.status(400).json({ message: "Agency Id is required, as well as the owner Id." });
            }
        }
        catch (error) {
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.DeleteModelsFromAnAgencyController = DeleteModelsFromAnAgencyController;
