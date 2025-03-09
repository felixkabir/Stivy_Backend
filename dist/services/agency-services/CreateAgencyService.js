"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAgencyService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class CreateAgencyService {
    async execute({ name, contact, file_key, file_url, userId }) {
        const newAgency = await PrismaHandler_1.prisma.agency.create({
            data: { name, contact, file_key, file_url, userId },
            include: { creator: true }
        });
        return newAgency;
    }
}
exports.CreateAgencyService = CreateAgencyService;
