import { prisma } from "../../PrismaHandler";


export class ListAllPlatformModelsService {
    async execute(): Promise<any> {

        const allPlatFormModels = await prisma.model.findMany({
            include: {
                agency: true,
                File: true,
            }
        })

        return allPlatFormModels
    }
}