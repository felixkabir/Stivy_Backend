"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateNotificationsToAllUsersService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
const CreateNotificationService_1 = require("./CreateNotificationService");
const index_1 = __importDefault(require("../../sockets/index"));
class GenerateNotificationsToAllUsersService {
    async execute({ creatorId, users, content }) {
        if (users.length) {
            const creator = await PrismaHandler_1.prisma.user.findUnique({ where: { id: creatorId } });
            for (const destiny of users) {
                if (creator && creator.id !== destiny.id) {
                    await new CreateNotificationService_1.CreateNotificationService().execute({
                        creatorId: creator.id,
                        createdForId: destiny.id,
                        content
                    });
                }
            }
            index_1.default.sendNotification();
        }
    }
}
exports.GenerateNotificationsToAllUsersService = GenerateNotificationsToAllUsersService;
