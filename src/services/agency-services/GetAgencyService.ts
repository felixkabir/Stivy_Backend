import { prisma } from "../../PrismaHandler";


type AgenCyTypeRequest = {
    agenceId: string;
}

export class GetAgencyService {
    async execute({ agenceId }: AgenCyTypeRequest): Promise<any> {

        if (agenceId) {
            const agencyes = await prisma.agency.findUnique({
                where: { id: agenceId },
                include: { models: true, creator: true, Post: true, _count: true}
            })

            if (!agencyes) {
                return null
            }

            return agencyes
        }

        const agencies = await prisma.agency.findMany({
            include: { models: true, _count:true , creator: true, Post: true},
        })

        return agencies
    }
}