"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateModelService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const PrismaHandler_1 = require("../../PrismaHandler");
class UpdateModelService {
    async execute({ id, height, name, shoes, waist, contact }) {
        const model = await PrismaHandler_1.prisma.modelEntity.findUnique({
            where: { id }
        });
        if (model) {
            const updatedModel = await PrismaHandler_1.prisma.modelEntity.update({
                where: { id: model.id },
                data: {
                    name: name ? name : model.name,
                    height: height ? height : model.height,
                    shoes: shoes ? shoes : model.shoes,
                    waist: waist ? waist : model.waist,
                    contact: contact ? contact : model.contact
                }
            });
            return updatedModel;
        }
        else {
            throw (0, http_errors_1.default)(404, "Model does not exist!");
        }
    }
}
exports.UpdateModelService = UpdateModelService;
