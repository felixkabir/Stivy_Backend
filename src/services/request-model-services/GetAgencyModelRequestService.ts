import { prisma } from "../../PrismaHandler";


type GetAgencyModelTypeRequest = {
    agencyId: string;
}

export class  GetAgencyModelRequestService {
    async execute({ agencyId }: GetAgencyModelTypeRequest): Promise<any> {

        const agencyRequests = await prisma.modelRequest.findMany({
            where: { agencyId: agencyId },
            include: { modelRequested: true, author: true }
        })

        return agencyRequests
    }
}