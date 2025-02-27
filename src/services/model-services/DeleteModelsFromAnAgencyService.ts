import { deleteFile } from "../../helpers/deleteFile";
import { prisma } from "../../PrismaHandler";
import { GetAgencyService } from "../agency-services/GetAgencyService";
import { GetUserService } from "../user-services/GetUserService";

type ModelTypeRequest = {
    agencyId: string;
    agencyOwnerId: string;
    model_ids: string[]
}

export class DeleteModelsFromAnAgencyService {
    async execute({ agencyId, agencyOwnerId, model_ids }: ModelTypeRequest): Promise<any> {

        if (model_ids && model_ids.length) {
            const user = await new GetUserService().execute({ userId: agencyOwnerId })
            const agency = await new GetAgencyService().execute({ agenceId: agencyId })

            if (user === null || agency === null) {
                return null
            }

            if (agency.userId === user.id) {
                
                for (const model_id of model_ids) {
                    const modelToRemove = await prisma.modelEntity.findUnique({
                        where: { id: model_id },
                        include: { file_entity: true }
                    })

                    if (modelToRemove) {
                        await prisma.modelEntity.delete({
                            where: { id: modelToRemove.id }
                        })
    
                        for (const file of modelToRemove.file_entity) {
                            await deleteFile(file.file_key)
                        }                        
                    }
                }
            }
        }
    }
}