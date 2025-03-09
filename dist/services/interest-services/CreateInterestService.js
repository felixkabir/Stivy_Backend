"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInterestService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class CreateInterestService {
    async execute({ type, name }) {
        await PrismaHandler_1.prisma.interest.create({
            data: {
                name,
                interest_type: type
            }
        });
    }
}
exports.CreateInterestService = CreateInterestService;
