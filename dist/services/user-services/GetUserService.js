"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class GetUserService {
    async execute({ userId }) {
        if (userId) {
            const user = await PrismaHandler_1.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    agencies: {
                        include: {
                            models: true,
                            creator: true,
                            Post: true,
                        }
                    }
                }
            });
            if (user) {
                return user;
            }
            return null;
        }
        else {
            const users = await PrismaHandler_1.prisma.user.findMany({
                include: {
                    agencies: {
                        include: {
                            models: true,
                            creator: true,
                            Post: true,
                        }
                    }
                }
            });
            return users;
        }
    }
}
exports.GetUserService = GetUserService;
