import { prisma } from "../../PrismaHandler";
import { AgencyType } from "../../Types";


export class CreateAgencyService {
    async execute({ name, contact, file_key, file_url, userId }:Omit<AgencyType, "id" | "created_at">): Promise<AgencyType> {

        const newAgency = await prisma.agency.create({
            data: { name, contact, file_key, file_url, userId },
            include: { creator: true }
        })

        return newAgency
    }
}