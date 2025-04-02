import { prisma } from "../../PrismaHandler";
import { PostType } from "../../Types";
import { CreateFileService } from "../file-services/CreateFileService";
import { GenerateNotificationsToAllUsersService } from "../notification-services/GenerateNotificationsToAllUsersService";

type PostTypeRequest = Omit<PostType, "id"> & {
    entityId: string;
    files?: Express.Multer.File[];
};

export class CreatePostService {
    async execute({ type, content, entityId, files }: PostTypeRequest): Promise<any> {
        const creator = await prisma.user.findUnique({ where: { id: entityId } });
        const model = await prisma.modelEntity.findUnique({
            where: { id: entityId },
            include: { user: true },
        });
        const agency = await prisma.agency.findUnique({
            where: { id: entityId },
            include: { creator: true },
        });
        const allUsers = await prisma.user.findMany();
        const fileService = new CreateFileService();

        if (!creator && !model && !agency) {
            throw new Error("Entity not found");
        }

        if (type === "MODEL") {
            if (!model) {
                throw new Error("Model not found");
            }

            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "MODEL",
                    modelId: model.id,
                },
            });

            if (!newPost) {
                throw new Error("Failed to create post");
            }

            // Cria os arquivos associados ao post
            await fileService.execute({
                entity_type: type,
                entity_id: model.id, // ID do modelo
                post_id: newPost.id, // ID do post criado
                files: files,
            });

            // Notifica todos os usuários
            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: model.user ? model.user.id : "",
                content: `${model.user ? model.user.username : ""} fez uma publicação.`,
                users: allUsers,
            });

            // Retorna o post criado com os arquivos associados
            const resultPost = await prisma.post.findUnique({
                where: {
                    id: newPost.id,
                },
                include: { file_entity: true, model_entity: true, user: true },
            });

            return resultPost;
        } else if (type === "AGENCY") {
            if (!agency) {
                throw new Error("Agency not found");
            }

            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "AGENCY",
                    agencyId: agency.id,
                },
            });

            if (!newPost) {
                throw new Error("Failed to create post");
            }

            // Cria os arquivos associados ao post
            await fileService.execute({
                entity_type: type,
                entity_id: agency.id, // ID da agência
                post_id: newPost.id, // ID do post criado
                files: files,
            });

            // Notifica todos os usuários
            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: agency.creator ? agency.creator.id : "",
                content: `${agency.creator ? agency.creator.username : ""} fez uma publicação.`,
                users: allUsers,
            });

            // Retorna o post criado com os arquivos associados
            const resultPost = await prisma.post.findUnique({
                where: {
                    id: newPost.id,
                },
                include: { file_entity: true, model_entity: true, user: true },
            });

            return resultPost;
        } else {
            if (!creator) {
                throw new Error("User not found");
            }

            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "USER",
                    userId: creator.id,
                },
            });

            if (!newPost) {
                throw new Error("Failed to create post");
            }

            // Cria os arquivos associados ao post
            await fileService.execute({
                entity_type: type,
                entity_id: newPost.id, // ID do post
                post_id: newPost.id, // ID do post criado
                files: files,
            });

            // Notifica todos os usuários
            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: creator.id,
                content: `${creator.username} fez uma publicação.`,
                users: allUsers,
            });

            // Retorna o post criado com os arquivos associados
            const resultPost = await prisma.post.findUnique({
                where: {
                    id: newPost.id,
                },
                include: { file_entity: true, model_entity: true, user: true },
            });

            return resultPost;
        }
    }
}