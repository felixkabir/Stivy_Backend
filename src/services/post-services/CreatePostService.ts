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

        const model = await prisma.modelEntity.findUnique({
            where: { id: entityId },
            include: { user: true }        
        })

        const agency = await prisma.agency.findUnique({ 
            where: { id: entityId },
            include: { creator: true }
        })

        const allUsers = await prisma.user.findMany()

        const fileService = new CreateFileService()

        if (!creator && !model && !agency) {
            return
        }

        if (type === "MODEL") {
            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "MODEL",
                    modelId: model?.id,
                }
            })

            await fileService.execute({ entity_type: type, entity_id: entityId, files: files})

            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: model?.user ? model.user.id : '',
                content: `${model?.user ? model.user.username : ''} fez uma publicação.`,
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
            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "AGENCY",
                    agencyId: agency?.id
                }
            })

            await fileService.execute({ entity_type: type, entity_id: entityId, files: files})

            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: agency ? agency.creator.id: "",
                content: `${agency ? agency.creator.username : ''} fez uma publicação.`,
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
            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "USER",
                    userId: creator?.id,
                }
            })

            const resultPost = await prisma.post.findMany({
                where: {
                    userId: newPost.userId
                },
                orderBy: { created_at: "desc"},
                include: { file_entity: true, model_entity: true, user: true }
            })

            await fileService.execute({ entity_type: type, entity_id: newPost.id, files: files})

            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: creator ? creator.id : "",
                content: `${creator ? creator.username : ""} fez uma publicação.`,
                users: allUsers
            })

            return resultPost[0]
        }
    }
}