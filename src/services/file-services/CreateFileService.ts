import { prisma } from "../../PrismaHandler";

type FileTypeRequest = {
    files?: Express.Multer.File[];
    post_id?: string;
    entity_id?: string;
    entity_type?: string;
};

export class CreateFileService {
    async execute({ files, entity_id, entity_type, post_id }: FileTypeRequest): Promise<any> {
        try {
            if (!files || files.length === 0) {
                return; // Nenhum arquivo para processar
            }

            for (const file of files) {
                const data: any = {
                    file_key: file.filename,
                    file_url: file.path,
                };

                if (entity_type === "MODEL") {
                    if (!entity_id) {
                        throw new Error("entity_id is required for MODEL type");
                    }
                    data.modelId = entity_id; // Associa ao modelo
                    data.postId = post_id; // Associa ao post
                } else if (entity_type === "AGENCY" || entity_type === "USER") {
                    if (!post_id) {
                        throw new Error("post_id is required for AGENCY or USER type");
                    }
                    data.postId = post_id; // Associa ao post
                }

                await prisma.fileEntity.create({ data });
            }

            return { message: "Files created successfully" };
        } catch (error) {
            console.error("Error in CreateFileService:", error);
            throw new Error("Failed to create files");
        }
    }
}