import { prisma } from "../../PrismaHandler";

type AgenCyTypeRequest = {
    agenceId: string;
}

export class GetAgencyModelsService {
    async execute({ agenceId }: AgenCyTypeRequest): Promise<any> {

        const allAgencyModels = await prisma.model.findMany({
            where: {
                agencyId: agenceId
            },

            include: { File: true}
        })

        return allAgencyModels
    }
}