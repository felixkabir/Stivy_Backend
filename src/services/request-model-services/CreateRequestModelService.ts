import createHttpError from "http-errors";
import { prisma } from "../../PrismaHandler";
import { ModelRequestType } from "../../Types";


export class CreateRequestModelService {
    async execute({ userId, modelId, agencyId }: ModelRequestType): Promise<any> {
        const user = await  prisma.user.findUnique({ where: { id: userId }})
        const model = await prisma.modelEntity.findUnique({ where: { id: modelId }})
        let agency;

        if (agencyId) {
            agency = await prisma.agency.findUnique({ where: { id: agencyId }})            
        }

        if (user) {
            if (model) {
                const newModelRequest = await prisma.modelRequest.create({
                    data: {
                        userId: user.id,
                        modelId: model?.id,
                        agencyId: agency?.id
                    }
                })
                
                return newModelRequest
            } else {
                throw createHttpError(404, "Modelo não encontrado.");                
            }
        } else {
            throw createHttpError(404, "Usuário não encontrado.");  
        }
    }
}