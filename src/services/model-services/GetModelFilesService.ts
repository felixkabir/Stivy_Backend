import { prisma } from "../../PrismaHandler";


type ModelFileTypeRequest = {
    modelId: string;
}

export class GetModelFilesService {
    async execute({ modelId }: ModelFileTypeRequest): Promise<any>{

        const model = await prisma.modelEntity.findUnique({
            where: { id: modelId}
        })

        if (model) {
            const allModelFiles = await prisma.post.findMany({
                where: {
                    modelId: model.id,
                    is_work_model: true,
                    type: "MODEL"
                },
                orderBy: { created_at: "asc"},
                include: { file_entity: true, model_entity: true }
            })

            return allModelFiles
        }
        
        return null
    }
}