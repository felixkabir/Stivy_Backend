"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAgencyController = void 0;
const DeleteAgencyService_1 = require("../../services/agency-services/DeleteAgencyService");
class DeleteAgencyController {
    async handle(request, response) {
        const { agenceId } = request.params;
        try {
            if (!agenceId) {
                response.status(400).json({ message: "Id is required!" });
                return;
            }
            const service = new DeleteAgencyService_1.DeleteAgencyService();
            const result = await service.execute({
                agenceId,
            });
            response.json(result);
        }
        catch (error) {
            response.status(404).json({ message: "Agency not found!" });
        }
    }
}
exports.DeleteAgencyController = DeleteAgencyController;
