"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfInterestExist = checkIfInterestExist;
const PrismaHandler_1 = require("../PrismaHandler");
async function checkIfInterestExist(type, name) {
    const interest = await PrismaHandler_1.prisma.interest.findMany({
        where: { interest_type: type, name: name }
    });
    if (interest && interest.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
