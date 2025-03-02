import { prisma } from "../../PrismaHandler";
import { CreatePostService } from "../post-services/CreatePostService";

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

        const postService = new CreatePostService()

        if (model) {
            await postService.execute({ type: "MODEL", content, entityId: model.id, files })

            const modelFilesUploadeds = await prisma.post.findMany({
                where: { userId: model.userId },
                orderBy: { created_at: "desc"},
                include: { model_entity: true, file_entity: true }
            })

            return modelFilesUploadeds[0]
        }

    }
}