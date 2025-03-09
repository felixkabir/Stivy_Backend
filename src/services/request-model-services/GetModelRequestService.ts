import { prisma } from "../../PrismaHandler";

type GetModelTypeRequest = {
    modelId: string;
}


export class GetModelRequestsService {
    async execute({ modelId }: GetModelTypeRequest): Promise<any> {

        const modelRequests  = await prisma.modelRequest.findMany({
            where: { modelId: modelId },
            include: { author: true }
        })

        return modelRequests
    }
}