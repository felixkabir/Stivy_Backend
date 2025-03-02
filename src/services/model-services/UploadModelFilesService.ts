import { prisma } from "../../PrismaHandler";
import { CreateFileService } from "../file-services/CreateFileService";


type ModelFileTypeRequest = {
    modelId: string;
    content: string;
    files: Express.Multer.File[]
}
export class UploadModelFilesService {
    async execute({ modelId, content, files}: ModelFileTypeRequest): Promise<any> {

        const model = await prisma.modelEntity.findUnique({
            where: { id: modelId }
        })

        const fileService = new CreateFileService()

        if (model) {
            
            const post = await prisma.post.create({
                data: {
                    modelId: model.id,
                    content,
                    type: "MODEL",
                    is_work_model: true
                }
            })

            await fileService.execute({ entity_id: model.id, files: files, entity_type: "MODEL", post_id: post.id })

            const modelFilesUploadeds = await prisma.post.findMany({
                where: { modelId: model.id, is_work_model: true },
                orderBy: { created_at: "desc"},
                include: { model_entity: true, file_entity: true }
            })

            return modelFilesUploadeds[0]
        }

    }
}