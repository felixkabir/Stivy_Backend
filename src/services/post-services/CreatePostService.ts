import { prisma } from "../../PrismaHandler"
import { PostType } from "../../Types"
import { GenerateNotificationsToAllUsersService } from "../notification-services/GenerateNotificationsToAllUsersService";


type PostTypeRequest = Omit<PostType, "id"> & {
    userId: string;
    entityId: string
}

export class CreatePostService {
    async execute({ type, content, entityId, userId }: PostTypeRequest): Promise<any> {
        const creator = await prisma.user.findUnique({ where: { id: userId }})
        const allUsers = await prisma.user.findMany()

        if (!creator) {
            return
        }

        if (type === "MODEL") {
            const model = await prisma.model.findUnique({ where: { id: entityId }})
            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "MODEL",
                    modelId: model?.id
                }
            })

            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: creator.id,
                content: `${creator.username} fez uma publicação.`,
                users: allUsers
            })
            
            return newPost
        } else if (type === "AGENCY") {
            const agency = await prisma.agency.findUnique({ where: { id: entityId }})
            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "AGENCY",
                    agencyId: agency?.id
                }
            })

            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: creator.id,
                content: `${creator.username} fez uma publicação.`,
                users: allUsers
            })

            return newPost
        } else {
            const user = await prisma.user.findUnique({ where: { id: entityId }})
            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "USER",
                    userId: user?.id
                }
            })

            await new GenerateNotificationsToAllUsersService().execute({
                creatorId: creator.id,
                content: `${creator.username} fez uma publicação.`,
                users: allUsers
            })

            return newPost
        }
    }
}