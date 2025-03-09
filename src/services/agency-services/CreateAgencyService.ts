import createHttpError from "http-errors";
import { prisma } from "../../PrismaHandler";
import { AgencyType } from "../../Types";


export class CreateAgencyService {
    async execute({ name, contact, file_key, file_url, userId }:Omit<AgencyType, "id" | "created_at">): Promise<AgencyType | any> {

        const verifyUserAgency = await prisma.agency.findMany({
            where: { userId: userId }
        })

        if (verifyUserAgency.length > 0) {
            throw createHttpError(401, "This user has already an Agency")            
        }

        const newAgency = await prisma.agency.create({
            data: { name, contact, file_key, file_url, userId },
            include: { creator: true, models: true }
        })

        return newAgency
    }
}