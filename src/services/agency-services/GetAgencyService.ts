import { prisma } from "../../PrismaHandler";
import { AgencyType } from "../../Types";


type AgenCyTypeRequest = {
    agenceId: string;
}

export class GetAgencyService {
    async execute({ agenceId }: AgenCyTypeRequest): Promise<AgencyType | AgencyType[] | null> {

        if (agenceId) {
            const userAgencies = await prisma.agency.findUnique({ where: { id: agenceId } })            

            return userAgencies
        }

        const agencies = await prisma.agency.findMany()

        return agencies
    }
}