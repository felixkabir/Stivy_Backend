import { prisma } from "../../PrismaHandler"
import { PostType } from "../../Types"
import { CreateFileService } from "../file-services/CreateFileService";
import { GenerateNotificationsToAllUsersService } from "../notification-services/GenerateNotificationsToAllUsersService";


type PostTypeRequest = Omit<PostType, "id"> & {
    entityId: string;
    files?: Express.Multer.File[]
}

export class CreatePostService {
    async execute({ type, content, entityId, files }: PostTypeRequest): Promise<any> {

        const creator = await prisma.user.findUnique({ where: { id: entityId }})
        const allUsers = await prisma.user.findMany()

        const fileService = new CreateFileService()

        if (!creator) {
            return
        }

        if (type === "MODEL") {
            const model = await prisma.modelEntity.findUnique({ where: { id: entityId }})
            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "MODEL",
                    modelId: model?.id,
                }
            })

            await fileService.execute({ entity_type: type, entity_id: entityId, files: files})

            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: creator.id,
                content: `${creator.username} fez uma publicação.`,
                users: allUsers
            })

            const resultPost = await prisma.post.findUnique({
                where: {
                    id: newPost.id
                },
                include: { file_entity: true, model_entity: true, user: true }
            })

            return resultPost

        } else if (type === "AGENCY") {
            const agency = await prisma.agency.findUnique({ where: { id: entityId }})
            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "AGENCY",
                    agencyId: agency?.id
                }
            })

            await fileService.execute({ entity_type: type, entity_id: entityId, files: files})

            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: creator.id,
                content: `${creator.username} fez uma publicação.`,
                users: allUsers
            })

            const resultPost = await prisma.post.findUnique({
                where: {
                    id: newPost.id
                },
                include: { file_entity: true, model_entity: true, user: true }
            })

            return resultPost

        } else {
            const user = await prisma.user.findUnique({ where: { id: entityId }})
            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "USER",
                    userId: user?.id
                }
            })

            const resultPost = await prisma.post.findUnique({
                where: {
                    id: newPost.id
                },
                include: { file_entity: true, model_entity: true, user: true }
            })

            await fileService.execute({ entity_type: type, entity_id: newPost.id, files: files})

            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: creator.id,
                content: `${creator.username} fez uma publicação.`,
                users: allUsers
            })

            return resultPost
        }
    }
}