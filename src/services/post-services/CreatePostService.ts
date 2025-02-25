import { prisma } from "../../PrismaHandler"
import { PostType } from "../../Types"


type PostTypeRequest = Omit<PostType, "id"> & {
    entityId: string
}

export class CreatePostService {
    async execute({ type, content, entityId }: PostTypeRequest): Promise<any> {

        if (type === "MODEL") {
            const model = await prisma.model.findUnique({ where: { id: entityId }})
            const newPost = await prisma.post.create({
                data: {
                    content,
                    type: "MODEL",
                    modelId: model?.id
                }
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

            return newPost
        }
    }
}