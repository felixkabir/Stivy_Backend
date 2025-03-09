"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const decodePassword_1 = require("../../helpers/decodePassword");
const GetUserByEmailService_1 = require("../user-services/GetUserByEmailService");
const GetUserService_1 = require("../user-services/GetUserService");
const set_user_status_1 = require("./set-user-status");
class LoginService {
    async execute({ email, password }) {
        const user = await new GetUserByEmailService_1.GetUserByEmailService().execute(email);
        if (user !== null) {
            const is_match = await (0, decodePassword_1.decodePassword)(password, user.password);
            if (is_match) {
                await new set_user_status_1.SetUserStatusService().execute({ email: String(user?.email), status: true });
                const userById = await new GetUserService_1.GetUserService().execute({ userId: user.id });
                return {
                    user: userById,
                    token: "_"
                };
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
}
exports.LoginService = LoginService;
