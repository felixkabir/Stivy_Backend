"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUserStatusService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
const GetUserByEmailService_1 = require("../user-services/GetUserByEmailService");
class SetUserStatusService {
    async execute({ email, status }) {
        const user = await new GetUserByEmailService_1.GetUserByEmailService().execute(email);
        await PrismaHandler_1.prisma.user.update({
            where: { id: user?.id },
            data: { online_status: status }
        });
    }
}
exports.SetUserStatusService = SetUserStatusService;
