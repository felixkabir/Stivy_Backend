"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateModelController = void 0;
const UpdateModelService_1 = require("../../services/model-services/UpdateModelService");
class UpdateModelController {
    async handle(request, response) {
        const { modelId } = request.params;
        const { shoes, name, waist, height, contact } = request.body;
        try {
            if (!modelId) {
                response.status(400).json({ message: "Model Id is Required!" });
                return;
            }
            const service = new UpdateModelService_1.UpdateModelService();
            const result = await service.execute({
                id: modelId,
                shoes,
                name,
                waist,
                height,
                contact
            });
            response.json(result);
        }
        catch (error) {
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.UpdateModelController = UpdateModelController;
