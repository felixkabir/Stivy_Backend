import { deleteFile } from "../../helpers/deleteFile";
import { prisma } from "../../PrismaHandler";

type DeleteFileTypeRequest = {
    entity_id: string;
    file_id?: string;
}

export class DeleteFileService {
    async execute({ entity_id, file_id }: DeleteFileTypeRequest): Promise<void> {

        if (file_id && entity_id) {            
            const modelsFileToDelete = await prisma.fileEntity.findUnique({
                where: { id: file_id, modelId: entity_id },
            })
    
            if (modelsFileToDelete) {
                await prisma.fileEntity.delete({ where: { id: modelsFileToDelete.id } })
                await deleteFile(modelsFileToDelete.file_key)  
                return          
            }
        }

        const postFileToDelete = await prisma.fileEntity.findMany({ where: { postId: entity_id } })

        if (postFileToDelete && postFileToDelete.length > 0) {
            for (const file of postFileToDelete) {
                await prisma.fileEntity.delete({ where: { id: file.id } })
                await deleteFile(file.file_key)            
            }            
        }
    }
}