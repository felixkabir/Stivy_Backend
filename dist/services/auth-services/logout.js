"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutService = void 0;
const GetUserByEmailService_1 = require("../user-services/GetUserByEmailService");
const set_user_status_1 = require("./set-user-status");
class LogoutService {
    async execute({ email }) {
        const user = await new GetUserByEmailService_1.GetUserByEmailService().execute(email);
        await new set_user_status_1.SetUserStatusService().execute({ email: String(user?.email), status: false });
    }
}
exports.LogoutService = LogoutService;
