import { prisma } from "../../PrismaHandler";

type AgenCyTypeRequest = {
    agenceId: string;
}

export class GetAgencyModelsService {
    async execute({ agenceId }: AgenCyTypeRequest): Promise<any> {

        const allAgencyModels = await prisma.modelEntity.findMany({
            where: {
                agencyId: agenceId
            },

            include: { file_entity: true}
        })

        return allAgencyModels
    }
}