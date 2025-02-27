import { prisma } from "../../PrismaHandler";
import { FileType } from "../../Types";

type FileTypeRequest = FileType & {
    entity_type: "MODEL" | "POST",
    entity_id?: string
}

export class CreateFileService {
    async execute({ file_key, file_url, entity_type, entity_id }: Omit<FileTypeRequest, "id">): Promise<any>{

        if (entity_type === "MODEL") {
            await prisma.fileEntity.create({
                data: {
                    file_key, file_url, modelId: entity_id
                }
            })
        } else {
            await prisma.fileEntity.create({
                data: {
                    file_url, file_key, postId: entity_id
                }
            })
        }

    }
}