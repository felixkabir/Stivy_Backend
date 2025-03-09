"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllPlatformModelsController = void 0;
const ListAllPlatformModelsService_1 = require("../../services/model-services/ListAllPlatformModelsService");
class ListAllPlatformModelsController {
    async handle(request, response) {
        const service = new ListAllPlatformModelsService_1.ListAllPlatformModelsService();
        const result = await service.execute();
        response.json(result);
    }
}
exports.ListAllPlatformModelsController = ListAllPlatformModelsController;
