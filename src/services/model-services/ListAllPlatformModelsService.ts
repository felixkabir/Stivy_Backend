import { prisma } from "../../PrismaHandler";


export class ListAllPlatformModelsService {
    async execute(): Promise<any> {

        const allPlatFormModels = await prisma.modelEntity.findMany({
            include: {
                agency: true,
                file_entity: true,
                ModelRequest: true
            }
        })

        return allPlatFormModels
    }
}