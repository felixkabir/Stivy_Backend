"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const deleteFile_1 = require("../../helpers/deleteFile");
const PrismaHandler_1 = require("../../PrismaHandler");
class DeleteUserService {
    async execute({ userId }) {
        try {
            const userToDelete = await PrismaHandler_1.prisma.user.delete({
                where: { id: userId },
            });
            if (userToDelete) {
                await (0, deleteFile_1.deleteFile)(String(userToDelete.file_key));
            }
        }
        catch (error) {
            throw (0, http_errors_1.default)(404, `Erro ao deletar usuario ${error}`);
        }
    }
}
exports.DeleteUserService = DeleteUserService;
