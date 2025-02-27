import { deleteFile } from "../../helpers/deleteFile";
import { prisma } from "../../PrismaHandler";

type DeleteFileTypeRequest = {
    entity_id: string;
    entity_type: "POST" | "MODEL"
}

export class DeleteFileService {
    async execute({ entity_id, entity_type }: DeleteFileTypeRequest): Promise<any> {

        if (entity_type === "MODEL") {
            const modelsFileToDelete = await prisma.fileEntity.findMany({ where: { modelId: entity_id }})

            for (const file of modelsFileToDelete) {
                await prisma.fileEntity.delete({ where: { id: file.id }})
                await deleteFile(file.file_key)
            }
        } else {
            const postFileToDelete = await prisma.fileEntity.findMany({ where: { postId: entity_id }})

            for (const file of postFileToDelete) {
                await prisma.fileEntity.delete({ where: { id: file.id }})
                await deleteFile(file.file_key)
            }
        }
    }
}