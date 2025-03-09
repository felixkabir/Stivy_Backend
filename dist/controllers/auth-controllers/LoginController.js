"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const login_1 = require("../../services/auth-services/login");
class LoginController {
    async handle(request, response) {
        const { email, password } = request.body;
        const service = new login_1.LoginService();
        const result = await service.execute({ email, password });
        if (result == null) {
            response.status(404).json({ message: "Email ou senha incorretos" });
            return;
        }
        response.json(result);
    }
}
exports.LoginController = LoginController;
