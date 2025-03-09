"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetModelFilesController = void 0;
const GetModelFilesService_1 = require("../../services/model-services/GetModelFilesService");
class GetModelFilesController {
    async handle(request, response) {
        const { modelId } = request.params;
        if (!modelId) {
            response.status(400).json({ message: "Model Id is required!" });
            return;
        }
        const service = new GetModelFilesService_1.GetModelFilesService();
        const result = await service.execute({ modelId });
        if (result === null) {
            response.status(404).json({ message: "Model does not exist." });
            return;
        }
        response.json(result);
    }
}
exports.GetModelFilesController = GetModelFilesController;
