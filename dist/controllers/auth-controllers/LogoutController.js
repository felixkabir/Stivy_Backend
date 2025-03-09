"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutController = void 0;
const logout_1 = require("../../services/auth-services/logout");
class LogoutController {
    async handle(request, response) {
        const { email } = request.body;
        const service = new logout_1.LogoutService();
        const result = await service.execute({ email: String(email) });
        response.json(result);
    }
}
exports.LogoutController = LogoutController;
