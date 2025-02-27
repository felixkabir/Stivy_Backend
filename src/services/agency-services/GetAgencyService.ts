import { prisma } from "../../PrismaHandler";


type AgenCyTypeRequest = {
    agenceId: string;
}

export class GetAgencyService {
    async execute({ agenceId }: AgenCyTypeRequest): Promise<any> {

        if (agenceId) {
            const agencyes = await prisma.agency.findUnique({
                where: { id: agenceId },
                include: { models: true}
            })

            if (!agencyes) {
                return null
            }

            return agencyes
        }

        const agencies = await prisma.agency.findMany({
            include: { models: true}
        })

        return agencies
    }
}