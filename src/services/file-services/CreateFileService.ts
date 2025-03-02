import { prisma } from "../../PrismaHandler";

type FileTypeRequest = {
    files?: Express.Multer.File[];
    post_id?: string;
    entity_id?: string;
    entity_type?: string;
}


export class CreateFileService {
    async execute({ files, entity_id, entity_type, post_id }: FileTypeRequest): Promise<any> {

        if (entity_type === "MODEL") {
            if (files && files.length) {
                for (const file of files) {
                    await prisma.fileEntity.create({
                        data: {
                            file_key: file.filename,
                            file_url: file.path,
                            modelId: entity_id,
                            postId: post_id
                        }
                    })                    
                }            
            }
            return

        } else if (entity_type === "AGENCY") {
            if (files && files.length) {
                for (const file of files) {
                    await prisma.fileEntity.create({
                        data: {
                            file_key: file.filename,
                            file_url: file.path,
                            postId: entity_id
                        }
                    })
                }
            }

        } else {
            if (files && files.length) {
                for (const file of files) {
                    await prisma.fileEntity.create({
                        data: {
                            file_key: file.filename,
                            file_url: file.path,
                            postId: entity_id
                        }
                    })                    
                }            
            }
        }
    }
}