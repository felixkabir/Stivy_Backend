"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/user-services/CreateUserService");
const generateHashPassword_1 = require("../../helpers/generateHashPassword");
const deleteFile_1 = require("../../helpers/deleteFile");
class CreateUserController {
    async handle(request, response) {
        const { username, email, password } = request.body;
        const service = new CreateUserService_1.CreateUserService();
        try {
            if (username.length > 0 && email.length > 0 && password.length > 0) {
                const result = await service.execute({
                    username,
                    email,
                    file_url: String(request.file?.path),
                    file_key: String(request.file?.filename),
                    password: await (0, generateHashPassword_1.generateHashPassword)(password)
                });
                response.json(result);
            }
            else {
                // Deletando arquivos caso der algum erro
                await (0, deleteFile_1.deleteFile)(String(request.file?.filename));
                response.status(400).json({ message: "Por favor, preencha todos os campos" });
            }
        }
        catch (error) {
            (0, deleteFile_1.deleteFile)(String(request.file?.filename));
            response.status(500).json({ message: `Ocorreu um erro inesperado: ${error}` });
        }
    }
}
exports.CreateUserController = CreateUserController;
